import {atom} from 'recoil';

export const authState = atom({
    key: 'authState',
    default: false
})

export const tokenState = atom({
    key: 'tokenState',
    default: false
})

export const driversState = atom({
    key: 'driversState',
    default: false
})

export const reloadDriversTrigger = atom({
    key: 'reloadDriversTrigger',
    default: false
})

export const usersVoteState = atom({
    key: 'usersVoteState',
    default: ' '
})

export const userVotedState = atom({
    key: 'userVotedState',
    default: false
})

export const currentUserState = atom({
    key: 'currentUserState',
    default: false
})