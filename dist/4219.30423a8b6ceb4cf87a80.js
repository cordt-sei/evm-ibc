"use strict";(self.webpackChunkibc_transfer_ui=self.webpackChunkibc_transfer_ui||[]).push([[4219],{73042:(n,e,i)=>{i(96540),i(83650),i(46759),i(69648),i(88393),i(80066),i(74848),i(41253),i(95821),i(60445),i(3418),i(48702),i(10941),i(16219),i(12174),i(29109),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825),i(89809)},75950:(n,e,i)=>{i.d(e,{E:()=>l});var o=i(29109),t=i(96540),a=(i(12174),i(60445),i(83650),i(46759),i(69648),i(88393),i(80066),i(74848),i(41253),i(95821),i(3418),i(48702),i(10941),i(16219),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(80426));i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825);const l=({wallet:n,chain:e,network:i})=>{const[l,d]=(0,t.useState)("0.0"),s=!e||n.connector.supportsNetworkSwitching()&&!i,{isLoading:r}=(0,a.v)((()=>(0,o.s)(void 0,void 0,void 0,(function*(){if(s)return;const e=yield n.getBalance();d(e)}))),{deps:[n.address,null==i?void 0:i.toString(),e],enabled:!s});return{balance:l,isLoading:r}}},15730:(n,e,i)=>{i.d(e,{$:()=>l});var o=i(29109),t=i(80066),a=(i(96540),i(12174),i(60445),i(83650),i(46759),i(69648),i(88393),i(74848),i(41253),i(95821),i(3418),i(48702),i(10941),i(16219),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(80426));i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825);const l=n=>{const{data:e,isLoading:i}=(0,a.v)((()=>(0,o.s)(void 0,void 0,void 0,(function*(){var e,i;if(!n)return{chainId:void 0,name:"",symbol:void 0};const o=yield n.getNetwork(),{connectedChain:a}=n,l=(0,t.nj)(a||""),d={chainId:o,name:null==l?void 0:l.displayName,symbol:null==l?void 0:l.symbol};if(o&&n.evmNetworks){const t=n.evmNetworks.find((n=>n.chainId===o));d.name=null!==(i=null!==(e=null==t?void 0:t.vanityName)&&void 0!==e?e:null==t?void 0:t.name)&&void 0!==i?i:d.name,d.icon=null==t?void 0:t.iconUrls[0]}return d}))),{deps:[n]});return{chain:e,isLoading:i}}},55968:(n,e,i)=>{i.d(e,{D:()=>l});var o=i(29109),t=i(80066),a=(i(96540),i(12174),i(60445),i(83650),i(46759),i(69648),i(88393),i(74848),i(41253),i(95821),i(3418),i(48702),i(10941),i(16219),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(80426));i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825);const l=(n,e)=>{const{data:i,isLoading:l}=(0,a.v)((()=>(0,o.s)(void 0,void 0,void 0,(function*(){var e,i,o,a,l,d;if(!n)return null;const s=yield n.getNetwork(),r=(0,t.nj)(null!==(e=n.connectedChain)&&void 0!==e?e:"");if(!s)return{name:null==r?void 0:r.displayName,symbol:null==r?void 0:r.symbol};const c="STARK"===n.connectedChain?"starknetNetworks":"ECLIPSE"===n.connectedChain?"eclipseNetworks":"evmNetworks",v=null===(i=n[c])||void 0===i?void 0:i.find((n=>n.chainId===s));return{name:null!==(a=null===(o=null==v?void 0:v.nativeCurrency)||void 0===o?void 0:o.name)&&void 0!==a?a:null==r?void 0:r.displayName,symbol:null!==(d=null===(l=null==v?void 0:v.nativeCurrency)||void 0===l?void 0:l.symbol)&&void 0!==d?d:null==r?void 0:r.symbol}}))),{deps:[e],initialData:null});return{currency:i,isLoading:l}}},58726:(n,e,i)=>{i.d(e,{c:()=>a}),i(96540),i(83650),i(46759),i(69648),i(88393),i(80066),i(74848),i(41253),i(95821),i(60445),i(3418),i(48702),i(10941),i(16219),i(12174),i(29109),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451);var o=i(80426),t=(i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825),i(89809));const a=n=>{const{getNameService:e,network:i}=(0,t.J)(),{data:a}=(0,o.v)((()=>e(n)),{deps:[n,i,e]});return a}},50682:(n,e,i)=>{i(96540),i(83650),i(46759),i(69648),i(88393),i(80066),i(74848),i(41253),i(95821),i(60445),i(3418),i(48702),i(10941),i(16219),i(12174),i(29109),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825),i(89809)},49062:(n,e,i)=>{i.d(e,{Z:()=>t});var o=i(96540);const t=n=>{const[e,i]=(0,o.useState)(null);return{goToInitialView:()=>i(null),setView:i,view:e||n}}},1366:(n,e,i)=>{i.d(e,{c:()=>l});var o=i(80066),t=i(93509),a=i(5053);const l=n=>{if(!(null==n?void 0:n.metadata.downloadLinks))return[];const e=(0,o.FJ)(n.metadata.downloadLinks),{currentDesktopUrl:i,userBrowser:l}=(0,t.c)(e);return l&&i?[{Icon:(0,a.G)(l),key:l,link:i,name:l}]:Object.entries(e).filter((([,n])=>""!==n)).filter((([n])=>"ios"!==n&&"android"!==n)).map((([n,e])=>({Icon:(0,a.G)(n),key:n,link:e,name:n})))}},36622:(n,e,i)=>{i(74848),i(96540),i(80066),i(83650),i(46759),i(69648),i(88393),i(41253),i(95821),i(60445),i(3418),i(48702),i(10941),i(16219),i(12174),i(29109),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(73042),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(7508),i(55062),i(89809),i(44128),i(95748),i(1366),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825),i(86049),i(55207),i(32934),i(78261),i(84787),i(33960),i(17632),i(21416),i(87496),i(25498)},55207:(n,e,i)=>{i.d(e,{B:()=>r});var o=i(74848),t=i(90054),a=(i(100),i(58080),i(96540),i(12174),i(29109),i(60445),i(83650),i(46759),i(69648),i(88393),i(80066),i(41253),i(95821),i(3418),i(48702),i(10941),i(16219),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(44128)),l=(i(58169),i(53006),i(74566),i(85168),i(71092),i(79620),i(22923),i(23121),i(59553),i(55062)),d=i(51645);i(78080),i(11012),i(79903),i(30261),i(96696),i(44719),i(14624),i(53454),i(31448),i(95253),i(98592),i(18983),i(21858),i(4623),i(44917),i(94734),i(26490),i(10647),i(26968),i(80622),i(31825),i(71172),i(44432),i(56950),i(43433),i(87583);const s=({children:n,className:e="",dataTestId:i="",icon:l,showSpinnerInIcon:s=!0,title:r})=>(0,o.jsxs)("div",{className:(0,t.x)("default-prompt-modal",e),"data-testid":i,children:[l&&(0,o.jsx)(d.x,{Icon:l,iconSize:96,isSpinning:s,className:"default-prompt-modal__icon-with-spinner"}),(0,o.jsxs)("div",{className:"default-prompt-modal__content",children:[r&&(0,o.jsx)(a.o,{variant:"title",color:"primary","data-testid":"title",children:r}),n]})]}),r=n=>(0,o.jsx)(l.X,{onClose:n.onClose,portalClassName:"prompt-modal-portal",portalContainerClassName:"prompt-modal-portal__container",children:(0,o.jsx)(s,Object.assign({},n))})},47739:(n,e,i)=>{i(74848),i(95081),i(95821),i(80066),i(60445),i(100),i(58080),i(96540),i(12174),i(29109),i(83650),i(46759),i(69648),i(88393),i(41253),i(3418),i(48702),i(10941),i(16219),i(89809),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(44128),i(58169),i(53006),i(74566),i(85168),i(71092),i(79620),i(22923),i(23121),i(59553),i(7508),i(55062),i(73042),i(55207),i(46856),i(78080),i(11012),i(79903),i(36100),i(30261),i(96696),i(44719),i(14624),i(53454),i(31448),i(95253),i(98592),i(18983),i(21858),i(4623),i(44917),i(94734),i(26490),i(10647),i(26968),i(80622),i(31825),i(71172),i(44432),i(56950),i(43433),i(87583)},96078:(n,e,i)=>{i(74848),i(95821),i(96540),i(83650),i(46759),i(69648),i(88393),i(80066),i(41253),i(60445),i(3418),i(48702),i(10941),i(16219),i(12174),i(29109),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(7508),i(55062),i(55207),i(90168),i(44128),i(50984),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825),i(34718),i(89809),i(17632),i(36100)},32865:(n,e,i)=>{i(74848),i(95821),i(60445),i(100),i(58080),i(96540),i(12174),i(29109),i(83650),i(46759),i(69648),i(88393),i(80066),i(41253),i(3418),i(48702),i(10941),i(16219),i(89809),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(44128),i(58169),i(53006),i(74566),i(85168),i(71092),i(79620),i(22923),i(23121),i(59553),i(7508),i(55062),i(73042),i(55207),i(78080),i(11012),i(79903),i(30261),i(96696),i(44719),i(14624),i(53454),i(31448),i(95253),i(98592),i(18983),i(21858),i(4623),i(44917),i(94734),i(26490),i(10647),i(26968),i(80622),i(31825),i(71172),i(44432),i(56950),i(43433),i(87583)},78261:(n,e,i)=>{i(74848),i(80066),i(96540),i(83650),i(46759),i(69648),i(88393),i(41253),i(95821),i(60445),i(3418),i(48702),i(10941),i(16219),i(12174),i(29109),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(73042),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(7508),i(55062),i(61028),i(55014),i(89809),i(28019),i(44128),i(55207),i(36100),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825)},37893:(n,e,i)=>{i(74848),i(95821),i(60445),i(100),i(58080),i(96540),i(12174),i(29109),i(83650),i(46759),i(69648),i(88393),i(80066),i(41253),i(3418),i(48702),i(10941),i(16219),i(89809),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(44128),i(58169),i(53006),i(74566),i(85168),i(71092),i(79620),i(22923),i(23121),i(59553),i(7508),i(55062),i(55207),i(50984),i(78080),i(11012),i(79903),i(30261),i(96696),i(44719),i(14624),i(53454),i(31448),i(95253),i(98592),i(18983),i(21858),i(4623),i(44917),i(94734),i(26490),i(10647),i(26968),i(80622),i(31825),i(71172),i(44432),i(34718),i(56950),i(43433),i(87583)},42953:(n,e,i)=>{i(29109),i(74848),i(95081),i(96540),i(83650),i(46759),i(69648),i(88393),i(80066),i(41253),i(95821),i(60445),i(3418),i(48702),i(10941),i(16219),i(12174),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(100),i(58080),i(44128),i(53006),i(36100),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(73042),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(7508),i(55062),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825),i(89809)}}]);