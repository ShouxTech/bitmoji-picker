import LogOut from './components/LogOut';
import LogInPage from './components/LogInPage';
import SearchBox from './components/SearchBox';
import { useState } from 'react';
import { TokenFile } from './token-file';
import Stickers from './components/Stickers';
import CopiedNotification from './components/CopiedNotification';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState();
    const [query, setQuery] = useState('');
    const [didCopyNotification, setDidCopyNotification] = useState(false);

    async function logIn(newToken) {
        setToken(newToken);

        setLoggedIn(true);

        await TokenFile.create(newToken);
    }

    async function logOut() {
        setLoggedIn(false);

        await TokenFile.remove();
    }

    function changeQuery(newQuery) {
        setQuery(newQuery);
    }

    function onNotificationCopied() {
        setDidCopyNotification(true);
        setTimeout(() => {
            setDidCopyNotification(false);
        }, 1500);
    }

    return (
        <div className="App h-screen">
            {loggedIn ? (
                <>
                    <SearchBox onQueryChange={changeQuery}/>
                    {didCopyNotification && <CopiedNotification/>}
                    <Stickers query={query} token={token} onNotificationCopied={onNotificationCopied}/>
                    <LogOut onClick={logOut}/>
                </>
            ) : (
                <LogInPage onLogIn={logIn}/>
            )}
        </div>
    )
}

export default App;