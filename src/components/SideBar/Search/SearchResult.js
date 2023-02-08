import React from 'react';
import ItemUser from './ItemUser';

const SearchResult = ({ data, click }) => {
    return (
        <div className='h-[82vh] pt-3 overflow-y-auto object-cover transition-all duration-300'>
            {data &&
                data.map((user, index) => (
                    <ItemUser
                        id={user.id}
                        click={click}
                        key={index}
                        avatar={user.avatar}
                        fullname={user.full_name}
                        username={user.user_name}
                        tick={user.tick}
                    />
                ))}
        </div>
    );
};

export default SearchResult;
