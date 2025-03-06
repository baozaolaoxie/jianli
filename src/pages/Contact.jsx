import React from 'react';
import { Container, Typography, Box, Grid, Paper, TextField, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
  return (
    <>
      {/* 联系页面头部 */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 700 }}>
            联系我
          </Typography>
          <Typography variant="h6" align="center">
            让我们一起创造精彩的广告作品
          </Typography>
        </Container>
      </Box>

      {/* 联系信息和表单 */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={6}>
          {/* 联系信息 */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: { xs: 4, md: 0 } }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, rgba(22,26,31,0.95) 0%, rgba(15,18,21,0.95) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(201, 164, 125, 0.08)',
                }}
              >
                <Typography variant="h4" component="h2" gutterBottom sx={{ 
                  fontWeight: 600,
                  mb: 4,
                  background: 'linear-gradient(90deg, #C9A47D, #E5D3B3)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  联系方式
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="body1">
                      contact@example.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="body1">
                      +86 138 8888 8888
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="body1">
                      上海市浦东新区陆家嘴金融贸易区
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
                  无论是项目合作、咨询交流，还是其他事宜，我都很乐意与您沟通。期待您的联系！
                </Typography>
              </Paper>
            </Box>
          </Grid>

          {/* 联系表单 */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 2,
                background: 'linear-gradient(135deg, rgba(22,26,31,0.95) 0%, rgba(15,18,21,0.95) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(201, 164, 125, 0.08)',
              }}
            >
              <Typography variant="h4" component="h2" gutterBottom sx={{ 
                fontWeight: 600,
                mb: 4,
                background: 'linear-gradient(90deg, #C9A47D, #E5D3B3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                发送消息
              </Typography>

              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="姓名"
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(201, 164, 125, 0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(201, 164, 125, 0.4)',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="电子邮箱"
                      variant="outlined"
                      required
                      type="email"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(201, 164, 125, 0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(201, 164, 125, 0.4)',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="主题"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(201, 164, 125, 0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(201, 164, 125, 0.4)',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="消息内容"
                      variant="outlined"
                      multiline
                      rows={4}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(201, 164, 125, 0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(201, 164, 125, 0.4)',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{
                        py: 1.5,
                        fontSize: '1.1rem',
                      }}
                    >
                      发送消息
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Contact;