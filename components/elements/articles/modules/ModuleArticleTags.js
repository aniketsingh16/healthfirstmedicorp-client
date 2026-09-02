import React from 'react';
import Link from 'next/link';

const ModuleArticleTags = ({ tags }) => {
    let tagItemsView;
    if (tags) {
        tagItemsView = tags.map(item => (
            <Link href="/blog" key={item} legacyBehavior>
                <a>#{item}</a>
            </Link>
        ));
        return (
            <p className="ps-post__tags">
                {tagItemsView}
            </p>
        );
    } else {
        return (<p>No Tag.</p>);
    }

};

export default ModuleArticleTags;