function LogOut(props) {
    return (
        <button className="bg-red-500 text-white p-1 rounded fixed bottom-2 right-2 text-sm" onClick={props.onClick}>Log Out</button>
    )
}

export default LogOut;