import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'
import Album from '../components/Album'
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function Page() {
    return(
        <div>
            <Head>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
            </Head>
            <CssBaseline />
            <Navbar />
            <main>
            <div style={{ background: 'grey' }}>
                <Paper style={{ padding: '2em'}} elevation={1}>
                    <Typography variant="h5" component="h3">
                        This is a sheet of paper.
                    </Typography>
                    <Typography component="p">
                        Paper can be used to build surface or other elements for your application.
                    </Typography>
                </Paper>
            </div>
            </main>
            <BottomNav />
        </div>
    );
}

export default Page