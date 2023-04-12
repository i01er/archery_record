import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
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

// let InitScore = [
//   { id: 0, sum3: 0, sum6: null, rawScore: [1, 2, 3] },
//   { id: 1, sum3: 0, sum6: 0, rawScore: [0, 0, 0] },
//   { id: 2, sum3: 0, sum6: null, rawScore: [0, 0, 0] },
//   { id: 3, sum3: 0, sum6: 0, rawScore: [0, 0, 0] },
//   { id: 4, sum3: 0, sum6: null, rawScore: [0, 0, 0] },
//   { id: 5, sum3: 0, sum6: 0, rawScore: [0, 0, 0] },
//   { id: 6, sum3: 0, sum6: null, rawScore: [4, 5, 6] },
//   { id: 7, sum3: 0, sum6: 0, rawScore: [0, 0, 0] },
//   { id: 8, sum3: 0, sum6: null, rawScore: [0, 0, 0] },
//   { id: 9, sum3: 0, sum6: 0, rawScore: [0, 0, 0] },
//   { id: 10, sum3: 0, sum6: null, rawScore: [0, 0, 0] },
//   { id: 11, sum3: 0, sum6: 0, rawScore: [0, 0, 0] },
// ];

const PadNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "X"];

// function totalXCount() {
//   InitScore.reduce((sum, a) => {
//     return sum + a.rawScore.reduce((partialSum, accul) => {
//       if (accul === "X") {
//         return partialSum + 1;
//       }
//       return partialSum;
//     }, 0)
//   }, 0)
// }

function Insert() {
  const InitScore = GenInitScore(12);
  var [isShown, setIsShown] = useState(false);
  var [singleScore, setSingleScore] = useState(0);
  const [scores, setScore] = useState(InitScore);
  const [TotalScore, setTotalScore] = useState(0);
  const [XCounter, setXCounter] = useState({
    TenX: 0,
    Xonly: 0
  });

  // function handleClick(element) {
  //   return !element;
  // }

  // const handleClick = event => {
  //   setIsShown(current => !current);
  // };

  function NumberPad(_id, _score) {
    // console.log(_id);
    // console.log(_score.rawScore);
    return (
      <div>
        <TableContainer className={styles.numPad}>
          <Table>
            <TableBody>
              {PadNumbers.map((PadNumber, index) => {
                if (index == 0 || index == 4 || index == 8) {
                  return (
                    <TableRow>
                      <TableCell align="center"><Button onClick={() => {_score = UpdateSingleScore(_score, PadNumber)}} variant="text">{PadNumbers[index]}</Button></TableCell>
                      <TableCell align="center"><Button onClick={() => {_score = UpdateSingleScore(_score, PadNumber+1)}} variant="text">{PadNumbers[index + 1]}</Button></TableCell>
                      <TableCell align="center"><Button onClick={() => {_score = UpdateSingleScore(_score, PadNumber+2)}} variant="text">{PadNumbers[index + 2]}</Button></TableCell>
                      <TableCell align="center"><Button onClick={() => {_score = UpdateSingleScore(_score, PadNumber+3)}} variant="text">{PadNumbers[index + 3]}</Button></TableCell>
                    </TableRow>
                  )
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

  function handleClick(element) {
    // console.log(element)
    setIsShown(element => !element);
    return !element;
  }

  //Generate Initial Score
  function GenInitScore(rounds) {
    let initScore = [];
    for (let i = 0; i < rounds; i++) {
      let element = {};
      if (i % 2 == 0) element = { id: i, sum3: 0, sum6: null, rawScore: [[0, isShown], [0, isShown], [0, isShown]] }
      else (element = { id: i, sum3: 0, sum6: 0, rawScore: [[0, isShown], [0, isShown], [0, isShown]] })
      initScore.push(element)
    }
    return initScore;
  }

  function UpdateSingleScore(element, newScore) {
    console.log(element);
    console.log("new: " + newScore);
    setSingleScore(newScore);
    return newScore;
  }

  //Update Score
  function UpdateScore(_id, _rawScore) {
    let _totalScore = 0;
    let _XCounter = {
      TenX: 0,
      Xonly: 0
    }
    const nextScore = scores.map(score => {
      if (score.id === _id) {
        score.rawScore.forEach((element, index) => {
          score.rawScore[index] = _rawScore[index];
          if (_rawScore[index] == 10 || _rawScore[index] == "X") {
            _XCounter.TenX = _XCounter.TenX + 1;
            if (_rawScore[index] == "X") {
              _XCounter.Xonly = _XCounter.Xonly + 1;
            }
          }
        })
        score.sum3 = _rawScore.reduce((partialSum, a) => {
          if (a == "X") { return partialSum + 10 }
          else { return partialSum + a }
        }, 0);
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
    setXCounter(_XCounter);
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
            <TableContainer className={styles.scoreTable}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>Score</TableCell>
                    <TableCell align="center">3</TableCell>
                    <TableCell align="center">6</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.map((score, index) => {
                    var RawScore = score.rawScore.map((subval) => {
                      return (
                        <TableCell align="center">
                          <Button
                            variant="text"
                            onClick={() => { subval[1] = handleClick(subval[1]) }}
                          >{subval[0]}
                          </Button>
                          {subval[1] && <Modal
                            open={subval[1]}
                            onClose={() => { subval[1] = handleClick(subval[1]) }}
                          >
                            <Box className={styles.numBox}>
                              <h3>
                                {subval[0]}
                              </h3>
                              <NumberPad
                                _id={score.id}
                                _score={score}
                              />
                            </Box>
                          </Modal>}
                        </TableCell>)
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
                    <TableCell colSpan={3}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell align="center">10+X's</TableCell>
                            <TableCell align="center">{XCounter.TenX}</TableCell>
                            <TableCell align="center">X's</TableCell>
                            <TableCell align="center">{XCounter.Xonly}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center">{TotalScore}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            {/* <Button onClick={() => { UpdateScore(8, [10, 10, "X"]) }}>Update</Button> */}
          </Container>
        </main>
      </ThemeProvider>
    </>
  )
}

export default Insert;