import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import Container from '@mui/material/Container';

const inter = Inter({ subsets: ['latin'] })

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

let InitScore = [
  { id: 0, sum3: 0, sum6: null, rawScore: [1, 2, 3] },
  { id: 1, sum3: 0, sum6: 0, rawScore: [0, 0, 0] },
  { id: 2, sum3: 0, sum6: null, rawScore: [0, 0, 0] },
  { id: 3, sum3: 0, sum6: 0, rawScore: [0, 0, 0] },
  { id: 4, sum3: 0, sum6: null, rawScore: [0, 0, 0] },
  { id: 5, sum3: 0, sum6: 0, rawScore: [0, 0, 0] },
  { id: 6, sum3: 0, sum6: null, rawScore: [4, 5, 6] },
  { id: 7, sum3: 0, sum6: 0, rawScore: [0, 0, 0] },
  { id: 8, sum3: 0, sum6: null, rawScore: [0, 0, 0] },
  { id: 9, sum3: 0, sum6: 0, rawScore: [0, 0, 0] },
  { id: 10, sum3: 0, sum6: null, rawScore: [0, 0, 0] },
  { id: 11, sum3: 0, sum6: 0, rawScore: [0, 0, 0] },
];

function Insert() {
  const [scores, setScore] = useState(InitScore);
  const [TotalScore, setTotalScore] = useState(0);

  function UpdateScore(_id, _rawScore) {
    let _totalScore = 0;
    const nextScore = scores.map(score => {
      if (score.id === _id) {
        score.rawScore.forEach((element, index) => {
          score.rawScore[index] = _rawScore[index];
        })
        score.sum3 = _rawScore.reduce((partialSum, a) => partialSum + a, 0);
        if (score.id % 2 == 1) {
          score.sum6 = scores[score.id - 1].sum3 + score.sum3;
          _totalScore = _totalScore + score.sum6;
          return score;
        } else {
          return score;
        }
      }
      if (score.id % 2 == 1) {
        score.sum6 = scores[score.id - 1].sum3 + score.sum3;
        _totalScore = _totalScore + score.sum6;
        return score;
      } else {
        return score;
      }
    });
    setScore(nextScore);
    setTotalScore(_totalScore);
    console.log(scores);
  }

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
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>分數</TableCell>
                    <TableCell align="center">三箭總分</TableCell>
                    <TableCell align="center">六箭總分</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.map((score, index) => {
                    var RawScore = score.rawScore.map(subval => {
                      return <TableCell align="center"><Button variant="text">{subval}</Button></TableCell>
                    })
                    return (
                      <TableRow>
                        {RawScore}
                        <TableCell align="center">{score.sum3}</TableCell>
                        <TableCell align="center">{score.sum6}</TableCell>
                      </TableRow>
                    )
                  })}

                  <TableRow>
                    <TableCell colSpan={3} />
                    <TableCell align="center">總分</TableCell>
                    <TableCell align="center">{TotalScore}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <Button onClick={() => { UpdateScore(6, [5, 6, 7]) }}>Update</Button>
          </Container>
        </main>
      </ThemeProvider>
    </>
  )
}

export default Insert;