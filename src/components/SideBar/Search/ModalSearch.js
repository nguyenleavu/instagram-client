import { useDebounce } from '@/components/hooks';
import search from '@/services/user/searchServices';
import { deleteAllRecent, getAllRecent } from '@/services/user/recentServiecs';
import { useEffect, useRef, useState } from 'react';
import * as Icon from '../../Icon/Icon';
import Recent from './Recent';
import SearchResult from './SearchResult';
import { useSelector } from 'react-redux';


const ModalSearch = ({ click, modalSearch }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openRecent, setOpenRecent] = useState(true);
    const [recent, setRecent] = useState([]);
    const [isClear, setIsClear] = useState(false);

    const debounced = useDebounce(searchValue, 700);
    const inputRef = useRef();

    const { user } = useSelector((state) => state.auth);
    // Call API Search
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchAPi = async () => {
            setLoading(true);
            const result = await search(debounced, user.token);
            setSearchResult(result);
            setOpenRecent(false);
            setLoading(false);
        };
        fetchAPi();
    }, [debounced]);

    // call api recent
    useEffect(() => {
        const fetchAPi = async () => {
            const result = await getAllRecent(user.token);
            setRecent(result);
        };
        fetchAPi();
    }, [isClear]);

    // button clear input
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        setOpenRecent(true);
        inputRef.current.focus();
    };

    // button clear all recent
    const handleClearAll = async () => {
        await deleteAllRecent(user.token);
        setIsClear(!isClear);
    };

    return (
        <div>
            <div className='modal-search bottom-0 top-0 left-[72px] absolute border-r-[1px] border-border-nav bg-side-dark text-white flex flex-col py-2'>
                <div>
                    <div className='h-[66px] pt-3 pl-6 pr-[14px] pb-9 my-2'>
                        <h1 className='text-2xl font-semibold leading-[27px] -translate-y-1'>
                            Search
                        </h1>
                    </div>
                    <div className='h-16 pb-6 border-b-[1px] border-border-nav'>
                        <label
                            role='status'
                            className='flex items-center mx-4 group bg-border-nav rounded-md group text-base font-light '
                        >
                            <input
                                placeholder='Search'
                                spellCheck={false}
                                value={searchValue}
                                ref={inputRef}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className='bg-transparent border-none outline-none w-full h-10 relative pl-4 pr-10 py-[3px] ml-7 group-focus-within:ml-0'
                            />
                            <button className='absolute left-8 group-focus-within:hidden block'>
                                <Icon.InputSearch />
                            </button>
                            {loading && (
                                <span className='absolute right-8 block animate-spin'>
                                    <i className='fa-solid fa-spinner text-grey-border-focus text-sm'></i>
                                </span>
                            )}
                            {!!searchValue && !loading && (
                                <button
                                    className='absolute right-8 cursor-pointer'
                                    onClick={handleClear}
                                >
                                    <i className='fa-sharp fa-solid fa-circle-xmark text-sm text-grey-border-focus'></i>
                                </button>
                            )}
                        </label>
                    </div>
                </div>
                <div className='flex-1 transition-all duration-200'>
                    {!openRecent ? (
                        searchResult && searchResult.length > 0 ? (
                            <SearchResult data={searchResult} click={click} />
                        ) : (
                            <div
                                role='status'
                                className='h-full w-full text-sm text-[#a8a8a8] flex justify-center items-center'
                            >
                                {loading ? (
                                    <span className='block animate-spin'>
                                        <i className='fa-solid fa-spinner text-grey-border-focus text-sm'></i>
                                    </span>
                                ) : (
                                    <p>No results found.</p>
                                )}
                            </div>
                        )
                    ) : (
                        <div className='flex flex-col h-full pt-3'>
                            <div className='flex justify-between items-center px-6 pb-2 pt-[6px] font-semibold'>
                                <h2 className='text-input-background'>
                                    Recent
                                </h2>
                                <button
                                    className='text-primary text-sm'
                                    onClick={handleClearAll}
                                >
                                    Clear all
                                </button>
                            </div>
                            {recent && recent.length > 0 ? (
                                !loading && (
                                    <Recent
                                        data={recent}
                                        click={click}
                                        isClear={() => setIsClear(!isClear)}
                                    />
                                )
                            ) : (
                                <div
                                    role='status'
                                    className='h-full w-full text-sm text-[#a8a8a8] flex justify-center items-center'
                                >
                                    {loading ? (
                                        <span className='block animate-spin'>
                                            <i className='fa-solid fa-spinner text-grey-border-focus text-sm'></i>
                                        </span>
                                    ) : (
                                        <p>No recent searches.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalSearch;
