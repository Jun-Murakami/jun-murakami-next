'use client';
import { useMediaQuery, Box, IconButton, useTheme } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

export default function DynamicMobileScrollButton() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme?.breakpoints.down('sm') ?? '(max-width:600px)');
  return (
    <>
      {isMobile && (
        <Box sx={{ height: 'calc(100vh - 330px)', textAlign: 'center' }}>
          <IconButton
            sx={{ height: 50, width: 50 }}
            onClick={() => {
              const targetElement = document.querySelector('.digest-grid');
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <KeyboardDoubleArrowDownIcon fontSize='large' />
          </IconButton>
        </Box>
      )}
    </>
  );
}
