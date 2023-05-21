import { useEffect, useState } from "react";
import { TokenFile } from "../token-file";

function LogInPage(props) {
    const [tryingToLogIn, setTryingToLogIn] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);

    let token = '';

    function setToken(e) {
        token = e.target.value;
    }

    async function logIn() {
        setTryingToLogIn(true);

        const res = await fetch('https://us-east-1-bitmoji.api.snapchat.com/direct/search?q=hello', {
            'method': 'GET',
            'headers': {
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.7',
                'bitmoji-token': token,
                'Referer': 'https://www.bitmoji.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            },
        });

        const jsonRes = await res.json();

        if (jsonRes.statusCode == 401) {
            setLoginFailed(true);

            setTimeout(() => {
                setLoginFailed(false);
                setTryingToLogIn(false);
            }, 2000);
        } else {
            setTryingToLogIn(false);

            props.onLogIn(token);
        }
    }

    async function onInputKeyDown(e) {
        if (e.key == 'Enter') {
            await logIn();
        }
    }

    useEffect(() => {
        async function logInFromTokenFile() {
            if (await TokenFile.doesExist()) {
                token = await TokenFile.read();
                await logIn();
            }
        }
        
        logInFromTokenFile();
    }, []);

    return (
        <>
            <div className={`${tryingToLogIn ? 'flex' : 'hidden'} flex-col items-center justify-center bg-[rgba(25,25,25,0.85)] fixed w-screen h-screen`}>
                <p className={`font-roboto font-medium ${loginFailed ? 'text-red-500' : 'text-white'} text-4xl`}>Validating Token...</p>
                <p className={`${loginFailed && 'text-red-200'} font-roboto text-white mt-1`}>{loginFailed ? 'Failed to log in (invalid token).' : 'This should only take a moment.'}</p>
            </div>
            <div className="flex flex-col w-2/3 h-screen m-auto items-center justify-center">
                <h1 className="text-center text-white font-roboto font-medium text-3xl">Log In</h1>
                <input type="text" className="w-5/6 text-center bg-zinc-600 h-8 mt-4 text-white p-3 outline-none font-roboto rounded" placeholder="Bitmoji Token" onChange={setToken} onKeyDown={onInputKeyDown}/>
                <button className="bg-sky-600 hover:bg-sky-700 active:bg-sky-600 text-white p-1 rounded mt-4 w-1/3 font-roboto" onClick={logIn}>Enter</button>
            </div>
        </>
    )
}

export default LogInPage;