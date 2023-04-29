import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import React, { useCallback, useEffect, useState } from 'react';
import Container from '@mui/material/Container';

const inter = Inter({ subsets: ['latin'] })

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const roundAttemptInitValues = {
  round: null,
  attempt: null
};

function Insert() {
  const [rounds, setRounds] = useState(6);
  const [gameInfo, setGameInfo] = useState({
    roundScores: []
  });
  const [roundAttemptSelected, setRoundAttemptSelected] = useState(
    roundAttemptInitValues
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const handleClose = useCallback(() => {
    setModalOpen(false);
    setRoundAttemptSelected(roundAttemptInitValues);
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

  useEffect(() => {
    const initScores = Array.apply(null, Array(rounds)).map(() => {
      return Array.apply(null, Array(6)).map(() => 0);
    });
    const initGameInfo = {
      roundScores: initScores
    };
    setGameInfo(initGameInfo);
  }, [rounds]);

  const updateScore = useCallback(
    (round, attempt, mark) => {
      const tGameInfo = { ...gameInfo };
      const { roundScores } = tGameInfo;

      roundScores[round][attempt] = mark;

      tGameInfo.roundScores = roundScores;
      setGameInfo(tGameInfo);
    },
    [gameInfo]
  );
  return (
    <>
      <Head>
        <title>Insert Archery Record</title>
        <meta name="description" content="Archery Record" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <main className={styles.main}>
          <Container maxWidth="auto">
            <h1 align="center">個人分紙</h1>
            <br /><br />
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: 3 }}>
                <Grid container sx={{ marginBottom: 1 }}>
                  <Grid item xs={4}>
                    &nbsp;
                  </Grid>
                  <Grid item xs={4}>
                    &nbsp;
                  </Grid>
                  <Grid item xs={4}>
                    &nbsp;
                  </Grid>
                </Grid>
                {gameInfo.roundScores.map((rs, roundIndex) => {
                  return (
                    <Box>
                      <Typography sx={{ textAlign: "left" }}>
                        Round {roundIndex + 1}
                      </Typography>
                      <Grid container sx={{ marginBottom: 1 }}>
                        {rs.map((s, attemptIndex) => {
                          return (
                            <Grid item xs={4}>
                              <Box border={1}>
                                <Button
                                  onClick={() => {
                                    setModalOpen(true);
                                    setRoundAttemptSelected({
                                      round: roundIndex,
                                      attempt: attemptIndex
                                    });
                                  }}
                                >
                                  {s}
                                </Button>
                              </Box>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  );
                })}
              </Box>
              <Box sx={{ flex: 2 }}>
                <Grid container sx={{ marginBottom: 1 }}>
                  <Grid item xs={6} sx={{ backgroundColor: "red" }}>
                    3
                  </Grid>
                  <Grid item xs={6} sx={{ backgroundColor: "red" }}>
                    6
                  </Grid>
                </Grid>
                {gameInfo.roundScores.map((rs) => {
                  return (
                    <Box>
                      <Typography>&nbsp;</Typography>
                      <Grid container sx={{ marginBottom: 1 }}>
                        <Grid item xs={6}>
                          <Box border={1}>
                            <Button sx={{ color: "black" }}>
                              {+rs[0] + rs[1] + rs[2]}
                            </Button>
                          </Box>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <Box border={1}>
                            <Button sx={{ color: "black" }}>
                              {+rs[3] + rs[4] + rs[5]}
                            </Button>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box border={1}>
                            <Button sx={{ color: "black" }}>
                              {rs.reduce((prev, curr) => {
                                return prev + curr;
                              }, 0)}
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  );
                })}
                <Grid container sx={{ marginBottom: 1 }}>
                  <Grid item xs={6}>
                    <h3>Total</h3>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Modal open={isModalOpen} onClose={handleClose}>
              <Box sx={style}>
                <Grid container>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((mark) => {
                    return (
                      <Grid item xs={3}>
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={() => {
                            updateScore(
                              roundAttemptSelected?.round,
                              roundAttemptSelected?.attempt,
                              mark
                            );
                            handleClose();
                          }}
                        >
                          {mark}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Modal>
          </Container>
        </main>
      </ThemeProvider>
    </>
  )
}

export default Insert;