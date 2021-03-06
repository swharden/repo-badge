
const githubStatusBadge_githubPath = "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 \
    0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 \
    1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 \
    0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 \
    1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 \
    3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z";

const githubStatusBadge_tagPath = "M2.5 7.775V2.75a.25.25 0 01.25-.25h5.025a.25.25 0 01.177.073l6.25 \
    6.25a.25.25 0 010 .354l-5.025 5.025a.25.25 0 01-.354 0l-6.25-6.25a.25.25 0 01-.073-.177zm-1.5 0V2.75C1 \
    1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 \
    1.75 0 01-2.474 0l-6.25-6.25A1.75 1.75 0 011 7.775zM6 5a1 1 0 100 2 1 1 0 000-2z";

const githubStatusBadge_starPath = "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 \
    01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 \
    01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 \
    2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 \
    2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 \
    0 01-.564-.41L8 2.694v.001z";

const githubStatusBadge_forkPath = "M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 \
    2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 \
    2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 \
    6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z";

const githubStatusBadge_HeadCss = `
    #github-stats-badge {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: #24292f;
        background-color: #ccd1d5;
        border: 1px solid rgba(27, 31, 36, .15);
        background-image: linear-gradient(180deg, #f6f8fa, #ebf0f4 90%);
        display: inline-block;
        padding: 5px 7px;
        font-size: 12px;
        line-height: 16px;
        text-align: left;
        border-radius: .25em;
        font-weight: 500;
        text-decoration: none;
    }

    #github-stats-badge a {
        color: black;
        text-decoration: none;
        opacity: 0;
        transition: opacity .5s ease-in-out;
    }

    #github-stats-badge a:hover {
        color: rgb(100, 100, 200);
    }

    #github-stats-badge a:hover > svg {
        fill: rgb(100, 100, 200);
    }
    `;

/* extract username and repo name from the original URL of the original href */
function githubStatusBadge_getUserAndRepoNames() {
    const badge = document.getElementById("github-stats-badge");
    const url = badge.href.endsWith('/') ? badge.href.slice(0, -1) : badge.href;
    const parts = url.split('/');
    const repoName = parts[parts.length - 1];
    const userName = parts[parts.length - 2];
    return [userName, repoName];
}

function githubStatusBadge_formatNumber(value, showExactValues = false) {

    if (showExactValues)
        return value;

    const thousand = value / 1000.0;

    if (value < 1000) {
        return value.toFixed(0);
    }

    if (Math.round(thousand) < 100) {
        return thousand.toFixed(1) + "k";
    }

    if (Math.round(thousand) < 1000) {
        return thousand.toFixed(0) + "k";
    }

    const million = thousand / 1000.0;
    return million.toFixed(1) + "M";
}

function githubStatusBadge_createSVG(svgPath) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.style.verticalAlign = 'bottom';
    svg.style.marginRight = "2px";

    const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('d', svgPath);
    svg.appendChild(path);

    return svg;
}

function githubStatusBadge_addIconAndText(row, svgPath, initialText, id) {

    const a = document.createElement("a");
    a.id = id;
    a.href = "github";
    a.style.opacity = 0;
    a.appendChild(githubStatusBadge_createSVG(svgPath));

    const span = document.createElement('span');
    span.innerText = initialText;
    span.style.marginRight = '3px';
    a.appendChild(span);

    row.appendChild(a);
}

function githubStatusBadge_init() {

    // add a new style element to the head
    const headStyle = document.createElement('style');
    headStyle.innerHTML = githubStatusBadge_HeadCss;
    document.head.appendChild(headStyle);

    // replace contents of the original link with two rows
    const badge = document.getElementById("github-stats-badge");
    badge.replaceChildren();

    const row1 = document.createElement("div");
    row1.id = "github-stats-badge--row1";
    row1.style.marginBottom = "3px";
    badge.appendChild(row1);

    const row2 = document.createElement("div");
    row2.id = "github-stats-badge--row2";
    row2.style.display = "grid";
    row2.style.gridAutoFlow = "column";
    badge.appendChild(row2);

    // populate the rows with icon/text pairs
    githubStatusBadge_addIconAndText(row1, githubStatusBadge_githubPath, "username/reponame", "github-stats-badge--repo");
    githubStatusBadge_addIconAndText(row2, githubStatusBadge_tagPath, "1.2.34", "github-stats-badge--tag");
    githubStatusBadge_addIconAndText(row2, githubStatusBadge_starPath, "6.9k", "github-stats-badge--stars");
    githubStatusBadge_addIconAndText(row2, githubStatusBadge_forkPath, "420", "github-stats-badge--forks");
}

function githubStatusBadge_updateData() {

    [userName, repoName] = githubStatusBadge_getUserAndRepoNames();
    const repoLinkUrl = `https://github.com/${userName}/${repoName}`;
    const showExactValues = document.getElementById("github-stats-badge").hasAttribute("data-exact");

    const opacityAfterLoad = .9;
    const isDevEnvironment = window.location.href.includes("localhost:") ||
        window.location.href.includes("127.0.0.1:");
    const repoUrl = isDevEnvironment ? 'repo.json' : `https://api.github.com/repos/${userName}/${repoName}`;
    const releaseUrl = isDevEnvironment ? 'release.json' : `https://api.github.com/repos/${userName}/${repoName}/releases/latest`;

    // repository name
    setTimeout(() => {
        const repo = document.getElementById('github-stats-badge--repo');
        repo.getElementsByTagName("span")[0].innerText = userName + '/' + repoName;
        repo.style.opacity = opacityAfterLoad;
        repo.href = repoLinkUrl;
    }, 50);

    // stars and forks
    fetch(repoUrl)
        .then(response => { return response.ok ? response.json() : { "stargazers_count": "error", "forks": "error" }; })
        .then(data => {
            if (data) {
                const stars = document.getElementById('github-stats-badge--stars');
                stars.getElementsByTagName("span")[0].innerText = githubStatusBadge_formatNumber(data.stargazers_count, showExactValues)
                stars.style.opacity = opacityAfterLoad;
                stars.href = repoLinkUrl + "/stargazers";

                const forks = document.getElementById('github-stats-badge--forks');
                forks.getElementsByTagName("span")[0].innerText = githubStatusBadge_formatNumber(data.forks, showExactValues)
                forks.style.opacity = opacityAfterLoad;
                forks.href = repoLinkUrl + "/network/members";
            }
        });

    // latest release tag
    fetch(releaseUrl)
        .then(response => { return response.ok ? response.json() : { "tag_name": "none" }; })
        .then(data => {
            const tag = document.getElementById('github-stats-badge--tag');
            tag.getElementsByTagName("span")[0].innerText = data.tag_name;
            tag.style.opacity = opacityAfterLoad;
            tag.href = repoLinkUrl + "/releases";
        });
}

if (typeof process === 'object') {
    // we are running in node, probably due to the test system
    console.log("exporting functions testing...");
    module.exports = githubStatusBadge_formatNumber;
} else {
    // we are in a browser window
    githubStatusBadge_init();
    githubStatusBadge_updateData();
}