'use client';
import { useState } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import { Box, Button, Card, CircularProgress, Divider, TextField, Typography } from '@mui/material';
import { useLanguage } from '@/contexts/LanguageContext';
import { en } from '@/locales/en';
import { ja } from '@/locales/ja';

const FORMSPARK_URL = 'https://submit-form.com/m3HDLM87d';

export default function ContactForm() {
  const { language } = useLanguage();
  const t = language === 'ja' ? ja : en;

  const [subject, setSubject] = useState('');
  const [from_name, setFromName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!subject || !from_name || !email || !message) {
      setErrorMessage(t.contact.validationError);
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      const res = await fetch(FORMSPARK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ subject, from_name, email, message }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      setSubject('');
      setFromName('');
      setEmail('');
      setMessage('');
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(t.contact.error);
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Card sx={{ p: 2, marginY: 4, backgroundColor: 'rgba(50, 50, 50, 0.5)', backdropFilter: 'blur(10px)' }}>
        <Typography variant='h5'>{t.contact.title}</Typography>
        <Divider sx={{ mb: 2 }} />
        {isSuccess && <Typography>{t.contact.success}</Typography>}
        {!isSuccess && (
          <form onSubmit={handleSubmit}>
            <TextField
              name='subject'
              label={t.contact.subject}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              fullWidth
              size='small'
              margin='normal'
            />
            <TextField
              name='from_name'
              label={t.contact.name}
              value={from_name}
              onChange={(e) => setFromName(e.target.value)}
              required
              fullWidth
              size='small'
              margin='normal'
            />
            <TextField
              name='email'
              label={t.contact.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              size='small'
              margin='normal'
            />
            <TextField
              name='message'
              label={t.contact.body}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              fullWidth
              size='small'
              multiline
              rows={6}
              margin='normal'
            />
            <Button type='submit' variant='contained' color='primary' disabled={isProcessing}>
              {isProcessing ? <CircularProgress size={22} sx={{ color: 'white' }} /> : t.contact.send}
            </Button>
            {errorMessage && <Typography color='error'>{errorMessage}</Typography>}
          </form>
        )}
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0 }}>
        <Button
          variant={'outlined'}
          startIcon={<ReplyIcon />}
          onClick={() => {
            window.location.href = '/';
          }}
          sx={{ mb: 10, backgroundColor: 'rgba(50, 50, 50, 0.5)', backdropFilter: 'blur(10px)' }}
        >
          {t.contact.back}
        </Button>
      </Box>
    </>
  );
}
