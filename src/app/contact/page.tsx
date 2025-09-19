'use client';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import ReplyIcon from '@mui/icons-material/Reply';
import { Box, Button, Card, CircularProgress, Divider, TextField, Typography } from '@mui/material';

const publicKey = process.env.NEXT_PUBLIC_MAIL_PUBLIC_ID;
const serviceId = process.env.NEXT_PUBLIC_MAIL_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID;

export default function ContactForm() {
  const [subject, setSubject] = useState('');
  const [from_name, setFromName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!serviceId || !templateId || !publicKey) {
      setErrorMessage('メール送信の設定が不正です。');
      return;
    }

    if (!subject || !from_name || !email || !message) {
      setErrorMessage('未入力の項目があります。');
      return;
    }

    setIsProcessing(true);

    // メール送信処理
    emailjs.sendForm(serviceId, templateId, e.target as HTMLFormElement, publicKey).then(
      (result) => {
        console.log('SUCCESS!', result.text);
        // 送信成功時の処理
        setSubject('');
        setFromName('');
        setEmail('');
        setMessage('');
        setIsSuccess(true);
        setIsProcessing(false);
      },
      (error) => {
        // 送信失敗時の処理
        setErrorMessage(`メッセージの送信に失敗しました。${error.text}`);
        setIsProcessing(false);
      }
    );
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
            <Button type='submit' variant='contained' color='primary'>
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

