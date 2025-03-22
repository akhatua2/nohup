// Material Icons in data URL format
const ICONS = {
    MENU: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTMgMThoMTh2LTJIM3Yyem0wLTVoMTh2LTJIM3Yyem0wLTd2MmgxOFY2SDN6IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
    COMMENT: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIxLjk5IDRjMC0xLjEtLjg5LTItMS45OS0ySDRjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoMTRsNCA0LS4wMS0xOHpNMTggMTRINnYtMmgxMnYyem0wLTNoLTEyVjloMTJ2MnptMC0zaC0xMlY2aDEydjJ6IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
    COMMENT_CURSOR: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.95 3.61 9.05 8.34 9.83L12 24l1.66-2.17C18.39 21.05 22 16.95 22 12c0-5.52-4.48-10-10-10z" fill="black"/>
        </svg>
    `),
    INBOX: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDNINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlY1YzAtMS4xLS45LTItMi0yem0wIDE2SDV2LTNoMy41NmMuNjkgMS4xOSAxLjk3IDIgMy40NSAyczIuNzUtLjgxIDMuNDUtMkgxOXYzem0wLTVoLTQuOTljMCAxLjEtLjkgMi0yIDJzLTItLjktMi0ySDVWNWgxNHY5eiIgZmlsbD0id2hpdGUiLz48L3N2Zz4='
}; 