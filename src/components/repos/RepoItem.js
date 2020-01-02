import PropTypes from 'prop-types'
import React from 'react'

const RepoItem = ({ repo }) => {
    return (
        <div>
            <h3>
            <a href={repo.html_url}>{repo.name}</a>
            </h3>
        </div>
    )
}

RepoItem.protoTypes = {
    repo: PropTypes.object.isRequired
}

export default RepoItem;