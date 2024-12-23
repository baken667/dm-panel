import { ImageRecord } from "@/types/image-record";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Props {
  initialImage?: ImageRecord;
  thumb: string;
  isPending?: boolean;
}

export interface UseUploadImage {
  state: File | null | undefined;
  preview: string | null;
  reset: () => void;
  handleImageUpload: (file: File) => void;
  removeImage: () => void;
  isDirty: boolean;
}

export function useUploadImage({ initialImage, thumb }: Props): UseUploadImage {
  const [state, setState] = useState<File | null | undefined>(undefined);
  const [isDirty, setIsDirty] = useState(false);

  const preview = useMemo(() => {
    if (state instanceof File) {
      return URL.createObjectURL(state);
    }

    if (state === null) {
      return null;
    }

    if (initialImage) {
      return initialImage[thumb] || initialImage.original;
    }

    return null;
  }, [state, initialImage, thumb]);

  const handleImageUpload = useCallback((file: File) => {
    setState(file);
    setIsDirty(true);
  }, []);

  const removeImage = useCallback(() => {
    setState(null);
    setIsDirty(true);
  }, []);

  const reset = useCallback(() => {
    setState(undefined);
    setIsDirty(false);
  }, []);

  useMemo(() => {
    if (state === undefined && !initialImage) {
      setIsDirty(false);
    } else if (state === null && initialImage) {
      setIsDirty(true);
    } else if (state instanceof File) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [state, initialImage]);

  useEffect(() => {
    reset();
  }, [initialImage, reset]);

  return {
    state,
    reset,
    handleImageUpload,
    removeImage,
    preview,
    isDirty,
  };
}
