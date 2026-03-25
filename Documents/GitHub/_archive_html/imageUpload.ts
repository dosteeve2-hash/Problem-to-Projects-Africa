'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export type UploadResult =
  | { success: true;  publicUrl: string; path: string }
  | { success: false; error: string };

const BUCKET = 'product-images';
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 Mo
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// ─────────────────────────────────────────────
// GÉNÉRATION UUID V4 (sans dépendance externe)
// ─────────────────────────────────────────────

function generateUUID(): string {
  // Utilise crypto.randomUUID si disponible (navigateurs modernes)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback manuel
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ─────────────────────────────────────────────
// UPLOAD IMAGE PRODUIT
// ─────────────────────────────────────────────

/**
 * Upload une image vers Supabase Storage.
 * - Nom de fichier unique (UUID) pour éviter les écrasements
 * - Validation type MIME et taille côté client
 * - Retourne l'URL publique directement utilisable
 */
export async function uploadProductImage(file: File): Promise<UploadResult> {
  // Validation type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      success: false,
      error: `Type de fichier non accepté. Formats autorisés : ${ALLOWED_TYPES.join(', ')}`,
    };
  }

  // Validation taille
  if (file.size > MAX_SIZE_BYTES) {
    const sizeMo = (file.size / 1024 / 1024).toFixed(1);
    return {
      success: false,
      error: `Fichier trop lourd (${sizeMo} Mo). Maximum : 5 Mo.`,
    };
  }

  // Générer un nom de fichier unique avec UUID
  const extension = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const uuid = generateUUID();
  const timestamp = Date.now();
  const filePath = `products/${timestamp}-${uuid}.${extension}`;

  const supabase = createBrowserSupabaseClient();

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,        // Ne jamais écraser — UUID garantit l'unicité
      contentType: file.type,
    });

  if (error) {
    console.error('[uploadProductImage] Erreur upload:', error);

    if (error.message.includes('row-level security')) {
      return {
        success: false,
        error: 'Accès refusé — vous devez être connecté en tant qu\'administrateur.',
      };
    }

    return { success: false, error: `Erreur upload : ${error.message}` };
  }

  // Récupérer l'URL publique
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(data.path);

  return {
    success: true,
    publicUrl,
    path: data.path,
  };
}

// ─────────────────────────────────────────────
// SUPPRESSION IMAGE
// ─────────────────────────────────────────────

/**
 * Supprime une image du Storage en utilisant son path.
 * Le path est stocké en base lors de l'upload.
 */
export async function deleteProductImage(path: string): Promise<{ success: boolean; error?: string }> {
  if (!path) return { success: false, error: 'Path manquant.' };

  const supabase = createBrowserSupabaseClient();

  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([path]);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ─────────────────────────────────────────────
// HOOK REACT : useImageUpload
// ─────────────────────────────────────────────

import { useState, useCallback } from 'react';

export type UploadState = {
  uploading:  boolean;
  progress:   number;
  publicUrl:  string | null;
  error:      string | null;
};

/**
 * Hook pour gérer l'upload d'image avec état de chargement.
 *
 * Usage :
 * const { state, upload, reset } = useImageUpload();
 * <input type="file" onChange={(e) => upload(e.target.files?.[0])} />
 */
export function useImageUpload() {
  const [state, setState] = useState<UploadState>({
    uploading:  false,
    progress:   0,
    publicUrl:  null,
    error:      null,
  });

  const upload = useCallback(async (file: File | undefined) => {
    if (!file) return;

    setState({ uploading: true, progress: 10, publicUrl: null, error: null });

    try {
      setState((s) => ({ ...s, progress: 40 }));
      const result = await uploadProductImage(file);
      setState((s) => ({ ...s, progress: 90 }));

      if (!result.success) {
        setState({ uploading: false, progress: 0, publicUrl: null, error: result.error });
        return;
      }

      setState({ uploading: false, progress: 100, publicUrl: result.publicUrl, error: null });
    } catch (err) {
      setState({
        uploading: false,
        progress: 0,
        publicUrl: null,
        error: err instanceof Error ? err.message : 'Erreur inconnue',
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ uploading: false, progress: 0, publicUrl: null, error: null });
  }, []);

  return { state, upload, reset };
}
