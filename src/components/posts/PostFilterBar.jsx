export const PostFilterBar = ({ allTopics, topicIdFilter, setTopicIdFilter, setSearchTerm }) => {
    return (
        <div className="filter-bar">
                <select
                    onChange={(event) => setTopicIdFilter(Number(event.target.value))}
                >
                    <option value="">
                        {topicIdFilter === "" ? "Select Topic" : "All Posts"}
                    </option>
                    {allTopics.map((topicObj) => (
                        
                        <option
                            key={topicObj.id}
                            className="filter-topic"
                            value={topicObj.id}
                        >
                            {topicObj.name}
                        </option>
                    ))}
                </select>
                <input 
                    type="text" 
                    placeholder="Search Posts" 
                    className="post-search"
                    onChange={(event) => {
                        setSearchTerm(event.target.value)
                    }}
                />
            </div>
    )
}