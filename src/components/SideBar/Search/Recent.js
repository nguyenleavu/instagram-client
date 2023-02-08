import ItemUserRecent from './ItemUserRecent';

const Recent = ({ data, click, isClear }) => {
    return (
        data && (
            <div className='mt-2'>
                {data.map((user, index) => (
                    <ItemUserRecent
                        id={user.recent_user.id}
                        click={click}
                        isClear={isClear}
                        key={index}
                        avatar={user.recent_user.avatar}
                        fullname={user.recent_user.full_name}
                        username={user.recent_user.user_name}
                        tick={user.recent_user.tick}
                    />
                ))}
            </div>
        )
    );
};

export default Recent;
