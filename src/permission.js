import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import {moduleHostRelationData} from "./utils/module-host-relation";
import {place,isPoint} from "./js/place";
import {toArray} from './js/path'

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = [
    '/home',
    '/syslogin',
    '/sign-login',
    // '/logistics/distributionbi_1',
    // '/logistics/distributionbi_2',
    // '/logistics/distributionbi_3',
    // '/logistics/distributionbi_4',
    // '/logistics/distributionbi_5',
    // '/wplanscreenbi',
    // '/log',
    '/no2onlineplan',
    '/no2aupplant2',
    // '/order-matching/startotd',
    // '/quality-screen',
    // '/jdb/yclcd',
    // '/yc/LS',
    // '/LS',
    // '/yc/painted-body',
    // '/yc/delivery-single',
    // '/yc/delivery-multi',
    // '/mrp/not-delivered',
    // '/mrp/area',
    // '/yc',
    // '/quality-screen-yc/index',
    // '/jdb-screen-yc/yclcd',
    // '/jdb-screen-yc/LS',
    // '/pull-screen-yc/delivery-single',
    // '/pull-screen-yc/delivery-multi',
    // '/paint-screen-yc/painted-body',
    // '/paint-screen-yc/area',
    // '/paint-screen-yc/index',
    // '/paint-screen-yc/modelArea',
    // '/mrp-screen-yc/work',
    // '/mrp-screen-yc/plan',
    // '/quality-screen-yc/report-missing',
    // '/previewExcel',
    // '/quality-screen-yc/screen',
    // '/hourly-balance-yc/screen',
    // '/logistics-center-yc/screen',
    // '/task-yc/screen',
] // no redirect whitelist

function setUseCase(){
    if(isPoint){
        if(window.monitorUseCaseInformation){
            window.monitorUseCaseInformation({serviceCode:'MA-0407_MSA_033',serviceName:'一汽奔腾ASCM系统'})
        }
    }
}
router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()
    // set page title
    document.title = getPageTitle(store.getters.language=='zh'?to.meta.title:to.meta.key4?to.meta.key4:to.meta.title)
    // determine whether the user has logged in
    const hasToken = getToken()
    if (hasToken) {
        if (toArray.findIndex(item=>item.path==to.path)!=-1) {
            setUseCase()
            next()
        } else if (to.path === '/syslogin'||to.path==='/sign-login') {
            // if is logged in, redirect to the home page
            if (toArray.findIndex(item=>item.mod==localStorage.getItem('MOD'))!=-1) {
                if (localStorage.getItem('scenario')) {
                    setUseCase()
                    next({
                        path: '/', query: {
                            scenario: localStorage.getItem('scenario'),
                            plant: localStorage.getItem('plant'),
                        }
                    })
                } else {
                    const toItem = toArray.find(item=>item.mod==localStorage.getItem('MOD'));
                    setUseCase()
                    next({path: toItem.path})
                }
            } else {
                setUseCase()
                next({path: '/'})
            }
            NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
        }else {
            // determine whether the user has obtained his permission roles through getInfo
            const hasUser = store.getters.user.user && store.getters.user.user.id !== 0
            if (hasUser) {
                if (toArray.findIndex(item=>item.mod==localStorage.getItem('MOD'))!=-1) {
                    if (localStorage.getItem('scenario')) {
                        if (!to.query.scenario || to.query.scenario != localStorage.getItem('scenario')) {
                            setUseCase()
                            next({
                                path: to.path, query: {
                                    ...to.query, ...{
                                        scenario: localStorage.getItem('scenario'),
                                        plant: localStorage.getItem('plant'),
                                    }
                                }
                            })
                        } else {
                            setUseCase()
                            next()
                        }
                    } else {
                        const toItem = toArray.find(item=>item.mod==localStorage.getItem('MOD'));
                        setUseCase()
                        next({path: toItem.path})
                    }
                } else {
                    setUseCase()
                    next()
                }
            } else {
                try {
                    await store.dispatch('user/getInfo')
                    const accessRoutes = await store.dispatch('permission/generateRoutes')
                    accessRoutes.push({
                        path: '*', redirect: '/404', hidden: true
                    })
                    router.addRoutes(accessRoutes)
                    if (toArray.findIndex(item=>item.mod==localStorage.getItem('MOD'))!=-1) {
                        if (localStorage.getItem('scenario')) {
                            if (!to.query.scenario || to.query.scenario != localStorage.getItem('scenario')) {
                                setUseCase()
                                next({
                                    path: to.path, query: {
                                        ...to.query, ...{
                                            scenario: localStorage.getItem('scenario'),
                                            plant: localStorage.getItem('plant'),
                                        }
                                    }
                                })
                            } else {
                                setUseCase()
                                next({...to, replace: true})
                            }
                        } else {
                            const toItem = toArray.find(item=>item.mod==localStorage.getItem('MOD'));
                            setUseCase()
                            next({path: toItem.path})
                        }
                    } else {
                        setUseCase()
                        next({...to, replace: true})
                    }
                } catch (error) {
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    //TODO 判断不走中台 直接走登录
                    var routerCatchPushItem = null
                    for (let i = 0; i < moduleHostRelationData.length; i++) {
                        var moduleHostRelationDataItem = moduleHostRelationData[i];
                        var find = moduleHostRelationDataItem.host.find(item => item == window.location.host);
                        if (find) {
                            routerCatchPushItem = moduleHostRelationDataItem
                            break
                        }
                    }
                    if (routerCatchPushItem) {
                        if(routerCatchPushItem.moduleNo==9){
                            if(place==0){
                                router.push({path: "/sign-login",
                                    query: {
                                        module: routerCatchPushItem.moduleNo,
                                        key1: window.location.protocol + '//' + window.location.host
                                    }
                                })
                            }else{
                                router.push({path: "/syslogin",
                                    query: {
                                        module: routerCatchPushItem.moduleNo,
                                        key1: window.location.protocol + '//' + window.location.host
                                    }
                                })
                            }
                        }else{
                            router.push({path: "/syslogin",
                                query: {
                                    module: routerCatchPushItem.moduleNo,
                                    key1: window.location.protocol + '//' + window.location.host
                                }
                            })
                        }
                        localStorage.setItem('MOD', routerCatchPushItem.moduleNo)
                    } else {
                        setUseCase()
                        next({path: `/home?redirect=${to.path}`, query: to.query})
                    }
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            setUseCase()
            next()
        } else {
            // '/no2onlineplan',
            // '/no2aupplant2',
            if(to.path=='/no2onlineplan'||to.path=='/no2aupplant2'){
                router.push({path: "/syslogin",
                    query: {
                        module: "5",
                        key1: to.path
                    }
                })
                localStorage.setItem('MOD', '5')
            }else{
                //TODO 判断不走中台 直接走登录
                var routerPushItem = null
                for (let i = 0; i < moduleHostRelationData.length; i++) {
                    var moduleHostRelationDataItem = moduleHostRelationData[i];
                    var find = moduleHostRelationDataItem.host.find(item => item == window.location.host);
                    if (find) {
                        routerPushItem = moduleHostRelationDataItem
                        break
                    }
                }
                if (routerPushItem) {
                    if(routerPushItem.moduleNo==9){
                        if(place==0){
                            router.push({path: "/sign-login",
                                query: {
                                    module: routerPushItem.moduleNo,
                                    key1: window.location.protocol + '//' + window.location.host
                                }
                            })
                        }else{
                            router.push({path: "/syslogin",
                                query: {
                                    module: routerPushItem.moduleNo,
                                    key1: window.location.protocol + '//' + window.location.host
                                }
                            })
                        }
                    }else{
                        router.push({path: "/syslogin",
                            query: {
                                module: routerPushItem.moduleNo,
                                key1: window.location.protocol + '//' + window.location.host
                            }
                        })
                    }

                    localStorage.setItem('MOD', routerPushItem.moduleNo)
                } else {
                    setUseCase()
                    next({path: `/home?redirect=${to.path}`, query: to.query})
                }
            }

            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bajr
    NProgress.done()
})
