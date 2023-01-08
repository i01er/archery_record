import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Input } from '@mui/material';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const inter = Inter({ subsets: ['latin'] })

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

let source = [
  [1,2,3],
  [1,2,3]
];

function RecordRow(props) {
  let lists = [];
  
  source.map((items,index) => {
    // lists.push(    <TableRow
    //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    // >)
    // items.forEach(element => {
    //   lists.push(<TableCell><TextField type="number" className={styles.content} id={index} inputProps={{ inputMode: 'numeric' }} value={element} /></TableCell>)
    // });
    // lists.push(</TableRow>)
  })
  for (let index = 0; index < 5; index++) {
    lists.push(<TableCell><TextField type="number" className={styles.content} id={index} inputProps={{ inputMode: 'numeric' }} value={props.arr[index]} /></TableCell>)
  }
  return (      {lists}    
  )
}

function Insert() {
  return (
    <>
      <Head>
        <title>Insert Archery Record</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <main className={styles.main}>
          <div className="container mx-auto">
            <h1 align="center">個人分紙</h1>
            <br /><br />
            <div className="clumns-auto">
              <TableContainer
              //  component={Paper}
              >
                <Table size="small">
                  <TableHead>
                    <TableCell align="center" colSpan={3}>分數</TableCell>
                    <TableCell align="center">三箭總分</TableCell>
                    <TableCell align="center">六箭總分</TableCell>
                  </TableHead>
                  <TableBody>
                    <RecordRow arr={source} />
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </main>
      </ThemeProvider>
    </>
  )
}

export default Insert;