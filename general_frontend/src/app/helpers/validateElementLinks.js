export const validateElementLink = (data, link) => {
    if (data[link] === undefined) {
        throw new Error(`KnowledgeHub: api does not contain any link with name ${link}`);
    }
}

export const validateElementLinkKey = (data, link, linkKey) => {
    if (data[link]?.data[linkKey] === undefined) {
        throw new Error(`KnowledgeHub: link does not contain any key with name ${linkKey}`);
    }
}