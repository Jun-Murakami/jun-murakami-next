'use client';
import { useState } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import { Box, Button, Card, CircularProgress, Divider, TextField, Typography } from '@mui/material';

const FORMSPARK_URL = 'https://submit-form.com/m3HDLM87d';

export default function ContactForm() {
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
      setErrorMessage('未入力の項目があります。');
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
      setErrorMessage(`メッセージの送信に失敗しました。時間をおいて再度お試しください。`);
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Card sx={{ p: 2, marginY: 4, backgroundColor: 'rgba(50, 50, 50, 0.5)', backdropFilter: 'blur(10px)' }}>
        <Typography variant='h5'>Contact Form</Typography>
        <Divider sx={{ mb: 2 }} />
        {isSuccess && <Typography>メッセージを送信しました。</Typography>}
        {!isSuccess && (
          <form onSubmit={handleSubmit}>
            <TextField
              name='subject'
              label='件名'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              fullWidth
              size='small'
              margin='normal'
            />
            <TextField
              name='from_name'
              label='お名前'
              value={from_name}
              onChange={(e) => setFromName(e.target.value)}
              required
              fullWidth
              size='small'
              margin='normal'
            />
            <TextField
              name='email'
              label='メールアドレス'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              size='small'
              margin='normal'
            />
            <TextField
              name='message'
              label='本文'
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
              {isProcessing ? <CircularProgress size={22} sx={{ color: 'white' }} /> : '送信'}
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
          戻る
        </Button>
      </Box>
    </>
  );
}
