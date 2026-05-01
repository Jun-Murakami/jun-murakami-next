'use client';

import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Box, IconButton, Modal } from '@mui/material';
import Image, { type StaticImageData } from 'next/image';

interface ScreenshotLightboxProps {
  src: StaticImageData;
  alt: string;
}

export const ScreenshotLightbox = ({ src, alt }: ScreenshotLightboxProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        component="button"
        type="button"
        onClick={handleOpen}
        aria-label={`${alt} を拡大表示`}
        sx={{
          display: 'block',
          maxWidth: 500,
          width: '100%',
          mb: 2,
          p: 0,
          border: 0,
          background: 'transparent',
          cursor: 'zoom-in',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 1,
          '& img': {
            display: 'block',
            transition: 'transform 0.3s ease',
          },
          '&:hover img': {
            transform: 'scale(1.03)',
          },
          '&:hover .lightbox-hover-overlay': {
            opacity: 1,
          },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2,
          },
        }}
      >
        <Image
          src={src}
          alt={alt}
          priority
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        <Box
          className="lightbox-hover-overlay"
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.35)',
            color: 'common.white',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            pointerEvents: 'none',
          }}
        >
          <ZoomInIcon sx={{ fontSize: 56 }} />
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-label={alt}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 1, sm: 2 },
        }}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: 'rgba(0, 0, 0, 0.85)' },
          },
        }}
      >
        <Box
          onClick={handleClose}
          sx={{
            position: 'relative',
            outline: 'none',
            maxWidth: 1200,
            width: '100%',
            maxHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label="close"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
              color: 'common.white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Image
            src={src}
            alt={alt}
            sizes="(max-width: 1200px) 100vw, 1200px"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '100vh',
              objectFit: 'contain',
              display: 'block',
              borderRadius: 4,
            }}
          />
        </Box>
      </Modal>
    </>
  );
};
