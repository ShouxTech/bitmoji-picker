import Search from '../assets/icons/Search.svg'

function SearchBox(props) {
    let query = '';

    function setQuery(e) {
        query = e.target.value;
    }

    function onInputKeyDown(e) {
        if (e.key == 'Enter') {
            props.onQueryChange(query);
        }
    }

    return (
        <>
            {/* Align to middle */}
            <div className="flex justify-center">
                {/* Input container. Used to combine the search icon and input box. */}
                <div className='w-[97%] fixed top-2'>
                    <img className="z-10 absolute left-2 top-1" src={Search} width={25} height={25}/>
                    <input type="text" className="w-full bg-zinc-700 h-8 text-gray-200 p-3 pl-10 outline-none font-roboto rounded-full" placeholder="Search" onChange={setQuery} onKeyDown={onInputKeyDown}/>
                </div>
            </div>
        </>
    )
}

export default SearchBox;