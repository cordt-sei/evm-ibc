"use strict";(self.webpackChunkibc_transfer_ui=self.webpackChunkibc_transfer_ui||[]).push([[4046],{74456:(e,t,i)=>{i.d(t,{k:()=>o});var n=i(96540);const o=()=>{const e=(0,n.useRef)(null);return{createRootElement:(t="dynamic-modal",i)=>{if("undefined"==typeof window)return e;const n=window.document.getElementById(t);if(n)return e.current=n,e;const o=i?window.document.getElementById(i):void 0;return e.current=window.document.createElement("div"),e.current.setAttribute("id",t),e.current.setAttribute("class",t),e.current.setAttribute("data-testid",t),e.current.style.pointerEvents="auto",o?o.appendChild(e.current):window.document.body.appendChild(e.current),e}}}},16446:(e,t,i)=>{i.d(t,{X:()=>c});var n=i(29109),o=i(96540),r=(i(83650),i(46759),i(69648),i(88393),i(80066),i(74848),i(41253),i(95821),i(60445),i(3418),i(48702),i(10941),i(16219),i(12174)),l=i(54769),d=(i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(76581)),a=(i(20545),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(97891)),s=(i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825),i(89809));const c=()=>{const{projectSettings:e,walletConnectorOptions:t}=(0,s.J)(),{connectWithEmail:i}=(0,a.N)(),{engageCaptcha:c}=(0,l.Tr)(),u=(0,d.x)(t);return{connectWithEmail:(0,o.useCallback)(((t,o)=>(0,n.s)(void 0,void 0,void 0,(function*(){var l;r.zm.emit("authInit",{email:t,option:t,type:"email"});try{(null===(l=null==e?void 0:e.security.hCaptcha)||void 0===l?void 0:l.enabled)&&"magicemailotp"!==(null==u?void 0:u.key)?c({authMethod:"email",onCaptchaSuccess:e=>(0,n.s)(void 0,void 0,void 0,(function*(){yield i(t,{captchaToken:e}),null==o||o()}))}):(yield i(t),null==o||o())}catch(e){throw r.zm.emit("authFailure",{email:t,option:t,type:"email"},{error:e}),e}}))),[i,c,null==e?void 0:e.security.hCaptcha,u])}}},40632:(e,t,i)=>{i.d(t,{H:()=>w});var n=i(29109),o=i(96540),r=i(80066),l=(i(83650),i(46759),i(69648),i(88393),i(74848),i(41253)),d=(i(95821),i(60445),i(3418),i(48702),i(10941),i(16219),i(12174)),a=(i(54769),i(60337),i(83219)),s=(i(4402),i(11011),i(40337),i(30325)),c=(i(81285),i(83441)),u=(i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(5678)),v=(i(30593),i(7085),i(15047)),m=(i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825),i(89809));const w=()=>{const{primaryWallet:e,projectSettings:t,user:i,setShowAuthFlow:w}=(0,m.J)(),{userHasEmbeddedWallet:y}=(0,v.L)(),{setView:f}=(0,l.At)(),{isTurnkeyWallet:h}=(0,u.b)();return{initExportProcess:(0,o.useCallback)(((...o)=>(0,n.s)(void 0,[...o],void 0,(function*(n=!1,o=!1){if(!e)throw new Error("No primary wallet");if(!i)throw new Error(a.nM);if(h&&(({user:e,recoveryPhrase:i})=>{var n,o;if(!(0,s.A)(t))throw new Error("Dynamic embedded wallet is not enabled. Go to the dashboard and make sure to have both Dynamic Embedded wallet and at least one EVM network enabled. Also, check if EthereumWalletConnectors is in the  DynamicContextProvider > settings > walletConnectors.");if(!y())throw new Error("Dynamic embedded wallet not found");const r=null===(o=null===(n=e.verifiedCredentials)||void 0===n?void 0:n.find((({walletName:e})=>null==e?void 0:e.startsWith("turnkey"))))||void 0===o?void 0:o.walletProperties,l=null==r?void 0:r.turnkeyHDWalletId;if(i&&!l)throw new Error("Wallet is non-HD and does not have a recovery phrase")})({recoveryPhrase:n,user:i}),(0,r.hz)(e.connector)&&(()=>{if(!(0,c.U)(t))throw new Error("Coinbase MPC is not enabled. Go to the dashboard and make sure to have Coinbase WaaS and at least one EVM network enabled. Also, make sure you are passing `EthereumWalletConnectors` to the `walletConnectors` prop in `DynamicContextProvider` `settings`.");if(!y())throw new Error("Coinbase MPC wallet not found")})(),!y())throw new Error("Dynamic embedded wallet not found");return w(!0,{ignoreIfIsEmbeddedWidget:!1,performMultiWalletChecks:!1}),f("embedded-reveal-view",{exportPrivateKey:!n,isPromptForExport:o}),new Promise(((e,t)=>{d.zm.once("embeddedWalletRevealCompleted",(t=>e(t))),d.zm.once("embeddedWalletRevealFailed",(e=>t(e)))}))}))),[e,h,w,f,i])}}},15047:(e,t,i)=>{i.d(t,{L:()=>ie});var n=i(29109),o=i(96540),r=i(46759),l=i(60445),d=(i(83650),i(69648)),a=(i(88393),i(80066)),s=(i(74848),i(41253)),c=(i(95821),i(3418),i(48702),i(10941),i(16219),i(12174)),u=(i(54769),i(60337)),v=i(86713),m=i(83219),w=(i(4402),i(11011),i(40337),i(30325)),y=(i(81285),i(83441)),f=(i(45468),i(99157),i(7116),i(23713)),h=i(81149),b=(i(21029),i(47979),i(63055)),p=(i(28765),i(40961),i(20545),i(11823)),C=(i(50574),i(451),i(5678)),k=(i(30593),i(7085),i(87237)),g=i(83073),W=i(53968),E=i(18669),S=i(6801),I=i(74813),A=i(96515),P=i(18003),K=i(63789),M=i(63809),O=i(98067),D=(i(20433),i(74456)),R=i(75988),U=i(32482),V=i(40166),z=i(10741),F=i(4650),x=i(59753),j=i(80607),J=i(86754),N=i(21521),B=i(42475),T=(i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825),i(89809));const q=e=>{var t;return!(!e||!(0,a.SE)(e))&&Boolean(null===(t=e.sessionKeys)||void 0===t?void 0:t.publicKey)};var H=i(51065),L=i(89297),_=i(2341),$=i(23966),Q=i(65200),X=i(87225),Y=i(45085),G=i(79622),Z=i(40609),ee=i(52331),te=i(71585);const ie=()=>{const{user:e,projectSettings:t}=(0,T.J)(),{isTurnkeyWallet:i}=(0,C.b)(),{createEmbeddedWallet:ie,canCreateMPCWallet:ne,createPassword:oe,revealEmbeddedWalletKey:re}=(()=>{const{projectSettings:e,walletConnectorOptions:t,user:i}=(0,T.J)(),{createPassword:s}=(0,Q.w)(),{createCoinbaseMPCWallet:w}=(()=>{const{user:e,walletConnectorOptions:t,environmentId:i,displaySiweStatement:s,appName:w,siweStatement:y,handleLogOut:f,setShowAuthFlow:b}=(0,T.J)(),{setError:p}=(0,u.pu)(),C=(0,o.useCallback)(((e,t,i)=>(0,n.s)(void 0,void 0,void 0,(function*(){var n;return t.setVerifiedCredentials(e.verifiedCredentials),(0,h.q)(i.id),t.createWallet({address:(yield null==t?void 0:t.getAddress())||"",chain:t.connectedChain,connector:t,id:i.id,isAuthenticated:!0,key:null!==(n=i.walletName)&&void 0!==n?n:t.key})}))),[]),k=(0,o.useCallback)((e=>(0,n.s)(void 0,[e],void 0,(function*({connector:e,backupCode:t,password:n,source:o}){const d=yield e.getAddress();if(!d)throw new l.ii("Missing address");const a=yield(0,G.d)({displaySiweStatement:s,environmentId:i,publicWalletAddress:d,siweStatement:(0,te.i)({appName:w,siweStatement:y}),walletConnector:e,walletProvider:"embeddedWallet"}),c=o===r.O8B.Dynamic?{password:n,passwordSource:o}:{},u=yield(0,ee.KM)(i,Object.assign(Object.assign(Object.assign({},c),a),{backup:t}));if(!u)throw new l.ii("Unable to link wallet");const v=(0,X.I)(u.user),m=v.verifiedCredentials.find((e=>e.id===v.lastVerifiedCredentialId&&"blockchain"===e.format));if(!m)throw new l.ii("No primary wallet found");return(0,h.q)(m.id),e.setVerifiedCredentials(v.verifiedCredentials),{newSelectedCredentialWallet:m,updatedUser:v}}))),[w,s,i,y]),g=(0,o.useCallback)(((e,t)=>(0,n.s)(void 0,void 0,void 0,(function*(){var i;const n=t||(0,Y.K)(20),o=t?r.O8B.User:r.O8B.Dynamic;try{const t=yield e.generateWallet(o,n),{updatedUser:r,newSelectedCredentialWallet:l}=yield k({backupCode:t,connector:e,password:n,source:o}),d=e.createWallet({address:(yield null==e?void 0:e.getAddress())||"",chain:null==e?void 0:e.connectedChain,connector:e,id:l.id,isAuthenticated:!0,key:null!==(i=l.walletName)&&void 0!==i?i:e.key});return c.zm.emit("embeddedWalletCreated",d,l,r),d}catch(e){d.v.error(e),e instanceof l.ii&&"create_embedded_wallet_error"===e.code&&(yield f(),p(e.message))}}))),[k,f,p]);return{createCoinbaseMPCWallet:(0,o.useCallback)(((...o)=>(0,n.s)(void 0,[...o],void 0,(function*(n=[r.uPd.Evm],o){var s;if(!e)throw new l.ii(m.nM);const u=null===(s=(0,H.H)(t))||void 0===s?void 0:s.walletConnector;if(!u||!(0,a.hz)(u)){const e=new l.ii("CoinbaseWaaSWalletConnectors not found");throw d.v.error("Failed to create embedded wallet",e),c.zm.emit("embeddedWalletFailed",e),p(e.message),e}b(!1);const{fetchAuthToken:w}=(0,Z.C)({environmentId:i});w&&u.setAuthTokenFetcher(w);const y=(0,v.v)(e,n);return y?C(e,u,y):g(u,o)}))),[e,t,b,i,g,p,C])}})(),{isLoadingEmbeddedWallet:y,setIsLoadingEmbeddedWallet:b}=(0,k.u2)(),p=(0,o.useCallback)((e=>(0,n.s)(void 0,void 0,void 0,(function*(){return s(e)}))),[s]),C=(0,o.useCallback)((o=>(0,n.s)(void 0,void 0,void 0,(function*(){var n,r,d;if(!i)throw new l.ii(m.nM);const s=(0,S.m)(i),c=(0,v.v)(i,o),u=!1===(null===(n=null==e?void 0:e.sdk.embeddedWallets)||void 0===n?void 0:n.automaticEmbeddedWalletCreation);if((null==s?void 0:s.length)&&!c&&!u)throw new l.r0("User already has a linked branded wallet, and manual mode creation is not enabled.");(0,$.x)(e);const w=null===(r=(0,H.H)(t))||void 0===r?void 0:r.walletConnector;if(!(0,a.hz)(w))throw new Error("Coinbase MPC wallet connector not found");w.setRequiredPassword(null!==(d=(0,L.q)(e))&&void 0!==d&&d)}))),[i,e,t]);return{canCreateMPCWallet:(0,o.useCallback)((e=>(0,n.s)(void 0,void 0,void 0,(function*(){try{return yield C(e),!0}catch(e){return!1}}))),[C]),createEmbeddedWallet:(0,o.useCallback)((t=>(0,n.s)(void 0,void 0,void 0,(function*(){if(!i)throw new l.ii(m.nM);let n;yield C(t),b(!0),!(0,v.v)(i,t)&&(0,_.t)(e)&&(n=yield s(!1,!0));const o=yield w(t,n);return b(!1),o}))),[i,w,s,C,e,b]),createPassword:p,isLoadingEmbeddedWallet:y,revealEmbeddedWalletKey:()=>(0,n.s)(void 0,void 0,void 0,(function*(){throw new l.ii("Coinbase MPC wallet does not support headless reveal yet")})),userHasEmbeddedWallet:()=>(0,f.C)(i,"coinbase")}})(),{createEmbeddedWallet:le,createEmbeddedWalletAccount:de,createOrRestoreSession:ae,createPasskey:se,revealEmbeddedWalletKey:ce,getPasskeys:ue,isSessionActive:ve,sendOneTimeCode:me,getWalletVersion:we}=(()=>{var e,t,i,u,w;const{projectSettings:y,primaryWallet:g,user:H,environmentId:L,walletConnectorOptions:_}=(0,T.J)(),{addedWalletsIds:$}=(0,b.i0)(),{createTurnkeyWallet:Q}=(()=>{const{projectSettings:e,walletConnectorOptions:t,setShowAuthFlow:i,environmentId:l,user:a,primaryWallet:u}=(0,T.J)(),{setView:w}=(0,s.At)(),{createDynamicEmbeddedWalletMutation:y}=(0,J.X)(),{getEOAWallet:f}=(0,R.R)(),b=(0,o.useCallback)(((e,o)=>(0,n.s)(void 0,void 0,void 0,(function*(){return new Promise(((n,r)=>{c.zm.once("embeddedWalletCreated",(e=>{n(e)})),c.zm.once("embeddedWalletFailed",(e=>r(e))),y({chains:e,environmentId:l,options:o,walletConnectorOptions:t,withAuthenticator:!1}).then((()=>{i(!1,{performMultiWalletChecks:!1})})).catch((e=>{r(e)}))}))}))),[y,l,t,i]),C=(0,o.useCallback)((e=>(0,n.s)(void 0,void 0,void 0,(function*(){return i(!0,{ignoreIfIsEmbeddedWidget:!1,performMultiWalletChecks:!1}),w("passkey-intro",{chains:e}),new Promise(((e,t)=>{c.zm.once("embeddedWalletCreated",(t=>e(t))),c.zm.once("embeddedWalletFailed",(e=>{e instanceof DOMException&&"NotAllowedError"===e.name?d.v.error("User cancelled the passkey creation.",e):t(e)}))}))}))),[i,w]),k=(0,o.useCallback)((e=>(0,n.s)(void 0,void 0,void 0,(function*(){var i,n;const{chain:o}=e,r=(0,E.h)(t,o);let l=null;if(a){null===(i=null==r?void 0:r.walletConnector)||void 0===i||i.setVerifiedCredentials(a.verifiedCredentials);const n=(0,B.K3)(e,a.verifiedCredentials);n?(yield(0,B.$1)({account:n,primaryWalletId:n.id,verifiedCredentials:a.verifiedCredentials,walletConnectorOptions:t}),l=n.id):l=e.id}l&&(0,h.q)(l);const d=Boolean(null===(n=e.walletProperties)||void 0===n?void 0:n.isAuthenticatorAttached);if(!(null==r?void 0:r.walletConnector))throw new Error("Could not find the embedded wallet connector");const s=r.walletConnector,c=s.createWallet({address:(yield s.getAddress())||"",chain:s.connectedChain,connector:s,id:e.id,isAuthenticated:d,key:e.walletName||s.key||""});return Promise.resolve(c)}))),[t,a]);return{createTurnkeyWallet:(0,o.useCallback)(((o,l)=>(0,n.s)(void 0,void 0,void 0,(function*(){var n,d,s,u,w,y;if(!a)throw new Error(m.nM);const f=!1===(null===(n=null==e?void 0:e.sdk.embeddedWallets)||void 0===n?void 0:n.automaticEmbeddedWalletCreation),g=(null===(d=null==e?void 0:e.sdk.embeddedWallets)||void 0===d?void 0:d.defaultWalletVersion)===r.Rpw.V2,W=(0,p.x)(e),E=(0,v.v)(a,null!=o?o:[W]),I=(0,S.m)(a);if(!(null==I?void 0:I.length)||!E&&f){const t=(0,K.X)(a,r.z3W.Email);return!(null===(s=null==e?void 0:e.sdk.embeddedWallets)||void 0===s?void 0:s.forceAuthenticatorAtSignup)&&t||(null==l?void 0:l.webAuthnAttestation)||g?b(o,l):C(o)}if(E&&a.newUser&&(null===(u=null==e?void 0:e.sdk.embeddedWallets)||void 0===u?void 0:u.automaticEmbeddedWalletCreation)){const e=(0,N.q)(t,W);if(!e)throw new Error("Could not find the embedded wallet connector");const i=e.createWallet({address:(yield e.getAddress())||"",chain:e.connectedChain,connector:e,id:E.id,isAuthenticated:Boolean(null===(w=null==E?void 0:E.walletProperties)||void 0===w?void 0:w.isAuthenticatorAttached),key:null!==(y=E.walletName)&&void 0!==y?y:e.key});(0,h.q)(E.id),c.zm.emit("embeddedWalletCreated",i,E,a)}if(i(!1,{performMultiWalletChecks:!1}),!E)throw new Error("Primary wallet is not an embedded wallet");return k(E)}))),[a,e,u,f,i,k,b,C,t])}})(),{hasRecoveryEmail:X}=(0,C.b)(),{createRootElement:Y}=(0,D.k)(),{isLoadingEmbeddedWallet:G,setIsLoadingEmbeddedWallet:Z}=(0,k.u2)(),{getEOAWallet:ee}=(0,R.R)(),te=null!==(e=g&&ee(g))&&void 0!==e?e:g,ie=(0,o.useCallback)((()=>(0,f.C)(H,"turnkey")),[H]),ne=(0,o.useCallback)((()=>(0,a.SE)(null==te?void 0:te.connector)?j.K1.V2:j.K1.V1),[null==te?void 0:te.connector]),{shouldInitRecovery:oe,initPasskeyRecoveryProcess:re}=(0,U.V)(),le=(0,o.useCallback)(((e,t)=>(0,n.s)(void 0,void 0,void 0,(function*(){var i;if(!H)throw new l.ii(m.nM);const n=(0,S.m)(H),o=(0,p.x)(y),r=(0,v.v)(H,null!=e?e:[o]),d=!1===(null===(i=null==y?void 0:y.sdk.embeddedWallets)||void 0===i?void 0:i.automaticEmbeddedWalletCreation);if((null==n?void 0:n.length)&&!r&&!d)throw new l.r0("User already has a linked branded wallet, and manual mode creation is not enabled.");return(0,F.D)(y),Z(!1),Q(e,t)}))),[Q,y,Z,H]),de=(0,o.useCallback)((e=>(0,n.s)(void 0,[e],void 0,(function*({chain:e}){var t,i,n;if(!H)throw new Error(m.nM);(0,F.D)(y);const o=(0,p.x)(y),d=(0,v.v)(H,[o]);if(!(null===(t=null==d?void 0:d.walletProperties)||void 0===t?void 0:t.turnkeyHDWalletId))throw new l.ii("No HD wallet was found for this user to derive a wallet account. Use createEmbeddedWallet first","NoHdWalletFound");const s=yield(0,A.AF)({chain:e,environmentId:L});(0,a.SE)(null==te?void 0:te.connector)?yield null===(i=null==te?void 0:te.connector)||void 0===i?void 0:i.createOrRestoreSession({ignoreRestore:!0}):(yield oe())&&(yield re("email"));const c=yield null===(n=null==te?void 0:te.connector)||void 0===n?void 0:n.stampCreateWalletAccountRequest({request:s}),u=yield(0,A.BQ)({createEmbeddedWalletAccountRequest:c,environmentId:L}),w=(0,x._)(H.verifiedCredentials,u.user.verifiedCredentials).filter((({format:e})=>e===r.z3W.Blockchain)).map((({id:e})=>e));return $.current=$.current.concat(w),(0,P.e4)({environmentId:L})}))),[L,null==te?void 0:te.connector,re,y,oe,H,$]),ae=(0,o.useCallback)((e=>(0,n.s)(void 0,void 0,void 0,(function*(){var t,i,n,o,r,s;if(!H)throw new l.ii(m.nM);const c=null==g?void 0:g.connector;if(c&&(0,a.SE)(c))return c.createOrRestoreSession();const u=null==te?void 0:te.connector;if(u&&(0,a.SE)(u))return u.createOrRestoreSession();const v=(0,M.y)(null==te?void 0:te.connector);if(v.isSessionActive())return m.M9;const w=Y(j.b3);if((0,z.c6)(null===(t=null==y?void 0:y.sdk.embeddedWallets)||void 0===t?void 0:t.sessionKeyDuration))try{if(yield(0,z.SR)({iframeContainer:w.current,iframeElementId:j.M_,sessionExpiration:(0,O.F)(null===(n=null===(i=null==y?void 0:y.sdk)||void 0===i?void 0:i.embeddedWallets)||void 0===n?void 0:n.sessionKeyDuration),user:H,wallet:g}))return m.QE}catch(e){d.v.error("Failed to restore embedded wallet",e)}if(!(null==e?void 0:e.oneTimeCode))throw new l.ii("One-time code is required to create a session.",m.Me);if(!ie()||!X)throw new l.ii("User does not have a secure enclave wallet or a verified email",m.t);const f=null===(s=null===(r=null===(o=null==H?void 0:H.verifiedCredentials)||void 0===o?void 0:o.find((({walletName:e})=>null==e?void 0:e.startsWith("turnkey"))))||void 0===r?void 0:r.walletProperties)||void 0===s?void 0:s.turnkeySubOrganizationId;yield v.verifyRecoveryCode(e.oneTimeCode,f);const h={createdAt:(new Date).getTime(),emailCode:e.oneTimeCode,userId:v.recoveryUserId};return l.n$.setItem(W.E4,h),m.IP}))),[Y,H,X,g,null===(i=null===(t=null==y?void 0:y.sdk)||void 0===t?void 0:t.embeddedWallets)||void 0===i?void 0:i.sessionKeyDuration,ie,null==te?void 0:te.connector]),se=(0,o.useCallback)((e=>(0,n.s)(void 0,void 0,void 0,(function*(){var t,i;if(!H)throw new l.ii(m.nM);(0,F.D)(y);const n=(0,E.J)(_,null===(t=null==y?void 0:y.sdk.embeddedWallets)||void 0===t?void 0:t.chainConfigurations,H.verifiedCredentials);if(!(null==n?void 0:n.walletConnector))throw new l.ii("Wallet connector not found",m.t);const o=n.walletConnector;o.setEmail(null==H?void 0:H.email),H&&!(null==H?void 0:H.email)&&(0,I.M)(o,H);const d=(0,K.X)(H,r.z3W.Email);if(!("id"in n)||!d)return o.getWebAuthnAttestation();const a=null===(i=null==n?void 0:n.walletProperties)||void 0===i?void 0:i.turnkeySubOrganizationId;if(!a)throw new l.ii("No sub organization id found for the wallet",m.t);const s=(0,M.y)(o);yield ae(e);const{attestation:c,challenge:u,displayName:v}=yield o.getWebAuthnAttestation();if(yield s.addPasskeyAuthenticator({attestation:c,challenge:u,turnkeySubOrganizationId:a}),!(yield(0,A.tQ)({attestation:c,challenge:u,environmentId:L,walletId:null==n?void 0:n.id})))throw new l.ii("Error completing passkey recovery");return{attestation:c,challenge:u,displayName:v}}))),[ae,L,y,H,_]),ce=(0,o.useCallback)((()=>(0,n.s)(void 0,void 0,void 0,(function*(){if(!H)throw new l.ii(m.nM);return(yield(0,A.FO)({environmentId:L})).passkeys}))),[H,L]),ue=(0,o.useMemo)((()=>{var e;const t=null==te?void 0:te.connector;return!(!t||!("getAuthenticatorHandler"in t))&&(null===(e=(0,M.y)(t))||void 0===e?void 0:e.isSessionActive())}),[null==te?void 0:te.connector]),ve=(0,o.useMemo)((()=>q(null==te?void 0:te.connector)),[null==te?void 0:te.connector]),me=(0,o.useMemo)((()=>q(null==g?void 0:g.connector)),[null==g?void 0:g.connector]),we=ue||me||ve,ye=(0,o.useCallback)((e=>(0,n.s)(void 0,[e],void 0,(function*({type:e,htmlContainerId:t}){var i,n,o,r,d,s;if(!H)throw new l.ii(m.nM);yield(0,V.pY)({wallet:te});const c=(0,E.J)(_,null===(i=null==y?void 0:y.sdk.embeddedWallets)||void 0===i?void 0:i.chainConfigurations,null==H?void 0:H.verifiedCredentials),u=null===(n=null==c?void 0:c.walletProperties)||void 0===n?void 0:n.turnkeyHDWalletId;"recoveryPhrase"!==e||u||(e="privateKey");const v=Y(j.jr,t||j.Ao);v.current.style.display="none",(0,a.SE)(null==te?void 0:te.connector)&&(yield null===(o=null==te?void 0:te.connector)||void 0===o?void 0:o.createOrRestoreSession()),yield(0,V.Ri)({iframeContainer:v.current,iframeElementId:j.jr,wallet:te});try{yield(0,V.cY)({address:"privateKey"===e?null==te?void 0:te.address:void 0,environmentId:L,user:H,wallet:te})}catch(t){(0,a.SE)(null==te?void 0:te.connector)&&(null===(r=null==te?void 0:te.connector)||void 0===r?void 0:r.removeSessionKeys)&&(yield null===(d=null==te?void 0:te.connector)||void 0===d?void 0:d.removeSessionKeys(),yield null===(s=null==te?void 0:te.connector)||void 0===s?void 0:s.createOrRestoreSession({ignoreRestore:!0})),yield(0,V.cY)({address:"privateKey"===e?null==te?void 0:te.address:void 0,environmentId:L,user:H,wallet:te})}return v.current.style.display="block",!0}))),[Y,L,te,null===(w=null===(u=null==y?void 0:y.sdk)||void 0===u?void 0:u.embeddedWallets)||void 0===w?void 0:w.chainConfigurations,H,_]),fe=(0,o.useCallback)((()=>(0,n.s)(void 0,void 0,void 0,(function*(){var e,t;if(!H)throw new l.ii(m.nM);const i=(0,E.J)(_,null===(e=null==y?void 0:y.sdk.embeddedWallets)||void 0===e?void 0:e.chainConfigurations,H.verifiedCredentials);if(!i||!("id"in i))throw new l.ii("User does not have a valid secure enclave wallet",m.t);const n=(0,M.y)(null==i?void 0:i.walletConnector),o=i.id;if(n.isSessionActive())throw new l.ii("Session is active. No need to create a new one",m.M9);const r=Y(j.b3),d=yield n.initRecovery("email",r.current,j.M_,(0,O.F)(null===(t=null==y?void 0:y.sdk.embeddedWallets)||void 0===t?void 0:t.sessionKeyDuration));if(!d)throw new l.ii(m.Er);const a=yield(0,A.UX)({authenticatorType:"email",environmentId:L,publicKey:d,walletId:o});return n.recoveryUserId=a.turnkeyUserId,m.BT}))),[Y,H,L,y,_]);return(0,o.useMemo)((()=>({createEmbeddedWallet:le,createEmbeddedWalletAccount:de,createOrRestoreSession:ae,createPasskey:se,getPasskeys:ce,getWalletVersion:ne,isLoadingEmbeddedWallet:G,isSessionActive:we,revealEmbeddedWalletKey:ye,sendOneTimeCode:fe,userHasEmbeddedWallet:ie})),[le,de,ae,se,ce,ne,G,we,ye,fe,ie])})(),{isLoadingEmbeddedWallet:ye}=(0,k.u2)(),fe=(0,o.useCallback)((()=>(0,f.C)(e)),[e]),he=(0,o.useCallback)((()=>{if(!e)throw new l.ii(m.nM);if(!fe())throw new l.ii("Embedded wallet not found");if(i)return we()}),[we,i,e,fe]),be=(0,o.useCallback)(((e,t)=>(0,n.s)(void 0,void 0,void 0,(function*(){return(yield ne(e))?yield ie(e):yield le(e,t)}))),[ne,ie,le]),pe=(0,o.useCallback)((()=>{var e;return Boolean(null===(e=null==t?void 0:t.sdk.embeddedWallets)||void 0===e?void 0:e.promptForKeyExport)}),[t]);return{createEmbeddedWallet:be,createEmbeddedWalletAccount:de,createOrRestoreSession:ae,createPasskey:se,createPassword:oe,getPasskeys:ue,getWalletVersion:he,isLoadingEmbeddedWallet:ye,isSessionActive:ve,revealWalletKey:t=>(0,n.s)(void 0,void 0,void 0,(function*(){if(!e)throw new l.ii(m.nM);if(!fe())throw new l.ii("Embedded wallet not found");return i?ce(t):re()})),sendOneTimeCode:me,shouldAutoCreateEmbeddedWallet:(0,o.useCallback)((e=>{var i,n,o,l,d;const a=(0,w.A)(t)||(0,y.U)(t),s=(0,g.r6)();if(!a||s)return!1;if(e){const l=(0,p.x)(t),d=null===(i=(0,v.v)(e,[l]))||void 0===i?void 0:i.id,a=(null===(o=null===(n=e.verifiedCredentials)||void 0===n?void 0:n.find((e=>e.walletProvider===r.EDz.SmartContractWallet)))||void 0===o?void 0:o.id)||d;if(a)return(0,h.q)(a),!1}return!(!(0,y.U)(t)&&(0,w.A)(t)&&!(null===(d=null===(l=null==t?void 0:t.sdk)||void 0===l?void 0:l.embeddedWallets)||void 0===d?void 0:d.automaticEmbeddedWalletCreation))}),[t]),shouldPromptForKeyExport:pe,userHasEmbeddedWallet:fe}}},80607:(e,t,i)=>{i.d(t,{Ao:()=>r,K1:()=>d,M_:()=>o,b3:()=>n,jr:()=>l});const n="dyn-secure-enclave-container-id",o="dyn-secure-enclave-element-id",r="dyn-secure-enclave-export-container-id",l="dyn-secure-enclave-export-element-id";var d;!function(e){e.V1="V1",e.V2="V2"}(d||(d={}))},57176:(e,t,i)=>{i.d(t,{M:()=>d});var n=i(29109),o=i(32482),r=(i(96540),i(83650),i(46759),i(69648),i(88393),i(80066),i(74848),i(41253)),l=(i(95821),i(60445),i(3418),i(48702),i(10941),i(16219),i(12174),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825),i(89809));const d=()=>{const{initPasskeyRecoveryProcess:e,shouldInitRecovery:t}=(0,o.V)(),{setShowAuthFlow:i}=(0,l.J)(),{setView:d}=(0,r.At)();return{addEmbeddedWalletRecoveryEmail:()=>(0,n.s)(void 0,void 0,void 0,(function*(){d("passkey-recovery-add-email"),i(!0)})),createOrRefreshAuthenticatorSession:i=>(0,n.s)(void 0,void 0,void 0,(function*(){if("passkey"===i||(yield t()))return e(i)}))}}},65200:(e,t,i)=>{i.d(t,{w:()=>c});var n=i(29109),o=i(96540),r=(i(83650),i(46759),i(69648)),l=(i(88393),i(80066),i(74848),i(41253)),d=(i(95821),i(60445),i(3418),i(48702),i(10941),i(16219),i(12174)),a=(i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(96515)),s=(i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825),i(89809));const c=()=>{const{primaryWallet:e,setShowAuthFlow:t,environmentId:i}=(0,s.J)(),{setView:c}=(0,l.At)(),u=(0,o.useCallback)(((e,i)=>(0,n.s)(void 0,void 0,void 0,(function*(){return t(!0,{ignoreIfIsEmbeddedWidget:!1}),e?c("wallet-claim-intro"):c("create-password-view",{isSignUp:i,notCalledFromWalletUtils:!0}),new Promise(((e,t)=>{d.zm.once("embeddedWalletCreatePasswordCompleted",(t=>e(t))),d.zm.once("embeddedWalletCreatePasswordFailed",(e=>t(e)))}))}))),[t,c]);return{claimWallet:(0,o.useCallback)((()=>(0,n.s)(void 0,void 0,void 0,(function*(){try{if(!e)throw new Error("No primary wallet");if("code"in(yield(0,a.K)({environmentId:i,walletId:e.id})))return void r.v.error("Error updating jwt after claiming wallet")}catch(e){throw r.v.error("Error claiming wallet",e),new Error("Error claiming wallet")}}))),[i,e]),createPassword:u}}},30447:(e,t,i)=>{i.d(t,{t:()=>m});var n=i(29109),o=i(96540),r=i(60445),l=i(46759),d=i(80066),a=i(53968);const s=e=>[...new Uint8Array(e)].map((e=>e.toString(16).padStart(2,"0"))).join("");i(45468),i(48702),i(4402),i(69648),i(3418),i(11011),i(88393),i(74848),i(41253),i(95821),i(10941),i(16219),i(40337),i(81285),i(20433),i(83073);var c=i(99157),u=i(96515),v=(i(7116),i(12174));const m=({environmentId:e,projectSettings:t})=>{const{user:i}=(0,c.Jd)(),m=()=>(0,n.s)(void 0,void 0,void 0,(function*(){const{private:e,public:t,privateJwk:i}=yield(0,n.s)(void 0,void 0,void 0,(function*(){const e=yield crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!0,["sign","verify"]),t=yield crypto.subtle.exportKey("raw",e.publicKey),i=yield crypto.subtle.exportKey("jwk",e.privateKey),n=(e=>{const t=new Uint8Array(e),i=t.byteLength,n=t.slice(0,1+i>>>1);return n[0]=2|1&t[i-1],n.buffer})(t),o=(r=(null==(r=i.d)?void 0:r.replace(/-/g,"+").replace(/_/g,"/"))||"",Uint8Array.from(atob(r),(e=>e.charCodeAt(0))));var r;return{private:s(o),privateJwk:i,public:s(n),publicUncompressed:s(t)}}));return r.n$.setItem(a.Bs,w(t,e,i,!1),a.k2),{privateKey:e,privateKeyJwk:i,publicKey:t}})),w=(e,t,i,n,o)=>{const r={expirationDate:o,privateKey:t,privateKeyJwk:i,publicKey:e,registered:n},l=JSON.stringify(r);return Buffer.from(l).toString("base64")},y=(0,o.useCallback)((()=>r.n$.removeItem(a.Bs,a.k2)),[]);return{generateSessionKey:m,getSessionPublicKey:()=>{const e=r.n$.getItem(a.Bs,a.k2),t=e?JSON.parse(Buffer.from(e,"base64").toString()):void 0;if(!(null==t?void 0:t.publicKey))throw new Error("Could not find session keys.");return null==t?void 0:t.publicKey},registerEmbeddedWalletSessionKey:(...t)=>(0,n.s)(void 0,[...t],void 0,(function*({ignoreRestore:t=!1}={}){const o=r.n$.getItem(a.Bs,a.k2),l=o?JSON.parse(Buffer.from(o,"base64").toString()):void 0;if(!l)throw d.vF.warn("Could not find session keys. Re-authentication is required to create new session keys."),v.zm.emit("triggerLogout"),new Error("Could not find session keys. Re-authentication is required to create new session keys.");if(!i)throw new Error("User not found");if(l.expirationDate&&new Date<=new Date(l.expirationDate)&&!t)return l;let c,y,f,h,b;if(l.registered){const{publicKey:e,privateKey:t,privateKeyJwk:o}=yield m();c=e,y=t,f=o,h=yield((e,t)=>(0,n.s)(void 0,void 0,void 0,(function*(){const i=yield crypto.subtle.importKey("jwk",e,{name:"ECDSA",namedCurve:"P-256"},!1,["sign"]),n=yield crypto.subtle.sign({hash:"SHA-256",name:"ECDSA"},i,(new TextEncoder).encode(t));return s(n)})))(l.privateKeyJwk,i.sessionId)}else({publicKey:c,privateKey:y,privateKeyJwk:f}=l);try{b=yield(0,u.j8)({environmentId:e,prevSessionKeySignature:h,publicKey:c})}catch(e){throw e instanceof r.QI&&(d.vF.warn("Invalid embedded wallet session key. Re-authentication is required to create new session keys."),v.zm.emit("triggerLogout")),e}const p=new Date(1e3*b.expiresAt);return r.n$.setItem(a.Bs,w(c,y,f,!0,p),a.k2),{expirationDate:p,privateKey:y,publicKey:c}})),removeSessionKey:y,shouldRegisterSessionKeysOnSignin:()=>{var e;return(null===(e=null==t?void 0:t.sdk.embeddedWallets)||void 0===e?void 0:e.defaultWalletVersion)===l.Rpw.V2}}}},46356:(e,t,i)=>{i.d(t,{w:()=>d});var n=i(96540),o=i(46759),r=i(69648);i(88393),i(80066),i(74848),i(41253),i(95821),i(60445),i(3418),i(48702),i(10941),i(16219);let l=!1;const d=({suppress:e=!1,projectSettings:t})=>{(0,n.useEffect)((()=>{var i;e||l||(null==t?void 0:t.environmentName)!==o.Bzj.Live||(l=!0,r.v.info("%cWarning!","color: red; font-size: 32px;"),r.v.info("%cThis is a browser feature intended for developers. You are reading this message because you opened the browser console, a developer tool.\n\n%c1. Never share your tokens or sensitive information with anyone.\n2. Do not paste any code you do not fully understand.\n3. If someone instructed you to do this, it is likely a scam.\n\n%cInjecting code into your browser could result in loss of tokens or control of your account that cannot be recovered or protected.","font-size: 16px;","font-size: 12px;","color: red; font-size: 12px;"),(null===(i=null==t?void 0:t.general)||void 0===i?void 0:i.supportUrls)&&Object.values(t.general.supportUrls).length>0&&r.v.info(`%cFor more information, visit ${Object.values(t.general.supportUrls)[0]}`,"font-size: 12px;"))}),[null==t?void 0:t.environmentName,e])}},67492:(e,t,i)=>{i(29109),i(96540),i(60445),i(46759),i(45468),i(48702),i(4402),i(69648),i(3418),i(11011),i(88393),i(80066),i(74848),i(41253),i(95821),i(1385),i(10941),i(16219),i(40337),i(81285),i(20433),i(83073),i(99157),i(17231),i(7116),i(83650),i(12174),i(54769),i(60337),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(30447),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825),i(89809)},82424:(e,t,i)=>{i.d(t,{F:()=>r});var n=i(96540),o=(i(46759),i(69648),i(88393),i(80066),i(74848),i(41253),i(95821),i(60445),i(3418),i(48702),i(10941),i(16219));const r=e=>({walletsForChainsMap:(0,n.useMemo)((()=>e?Object.assign(Object.assign({},o.J0),{primary_chain:e.primary_chain,wallets:Object.assign(Object.assign({},o.J0.wallets),Boolean(e.wallets)&&e.wallets)}):o.J0),[e])})},91444:(e,t,i)=>{i.d(t,{F:()=>l});var n=i(96540),o=i(88393),r=i(69304);const l=()=>{const e=(0,r.D)();return(0,n.useCallback)((t=>(0,o.eW)(t,e)),[e])}},67512:(e,t,i)=>{i.d(t,{C:()=>o});var n=i(96540);const o=()=>{const[,e]=(0,n.useState)(0);return()=>e((e=>e+1))}},78816:(e,t,i)=>{i.d(t,{M:()=>d});var n=i(29109),o=i(96540),r=i(60445),l=(i(83650),i(46759),i(69648),i(88393),i(80066),i(74848),i(41253),i(95821),i(3418),i(48702),i(10941),i(16219),i(12174),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825),i(89809));const d=()=>{const{handlers:e}=(0,l.J)(),{handleAuthenticatedUser:t}=null!=e?e:{},i=(0,o.useRef)(t);return i.current=t,(0,o.useCallback)((e=>(0,n.s)(void 0,void 0,void 0,(function*(){i.current&&(yield(0,r.Ly)((()=>{var t;return null===(t=i.current)||void 0===t?void 0:t.call(i,{user:e})})))}))),[])}},2224:(e,t,i)=>{i.d(t,{Q:()=>a});var n=i(29109),o=i(96540),r=i(63055),l=(i(60445),i(46759),i(45468),i(48702),i(4402),i(69648),i(3418),i(11011),i(88393),i(80066),i(74848),i(41253),i(95821),i(10941),i(16219),i(40337),i(81285),i(20433),i(83073)),d=(i(99157),i(7116),i(52331));const a=({verifiedCredentials:e,environmentId:t,primaryWalletId:i,secondaryWallets:a})=>{const{removedWalletsIds:s}=(0,r.i0)();return(0,o.useCallback)((o=>(0,n.s)(void 0,void 0,void 0,(function*(){var n;const r=null!==(n=(0,l.r6)())&&void 0!==n?n:i;if(o===r)return;yield(0,d.jK)({environmentId:t,onSuccess:()=>{s.current.push(o)},primaryWalletId:r,walletId:o});const c=a.find((e=>e.id===o));1===e.filter((e=>e.walletName===((null==c?void 0:c.connector.key)||""))).length&&(yield null==c?void 0:c.connector.endSession())}))),[i,t,a,e,s])}},11016:(e,t,i)=>{i.d(t,{u:()=>v});var n=i(29109),o=i(96540),r=i(60445),l=(i(83650),i(46759),i(69648),i(88393),i(80066),i(74848),i(41253),i(95821),i(3418),i(48702),i(10941),i(16219),i(12174),i(54769),i(60337),i(4402),i(11011),i(52957)),d=(i(40337),i(81285),i(45468),i(99157),i(7116),i(18003)),a=(i(20433),i(83073),i(21029),i(47979),i(63055),i(1259)),s=(i(40961),i(20545),i(50574),i(28765)),c=i(451),u=(i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825),i(89809));const v=()=>{const{setVerificationUUID:e,setDisplayedDestination:t}=(0,s.vm)(),{environmentId:i}=(0,u.J)(),{verifyOtp:v}=(0,a.D)(),m=(0,o.useCallback)(((e,t)=>(0,n.s)(void 0,void 0,void 0,(function*(){if("email"===e&&t.emailVerification||"sms"===e&&t.smsVerification)return t;const n="email"===e?"email":"phoneNumber";if(!t.user[n])throw new r.Sg(`missing ${n} field to perform update`);const o=yield c._.validate({[n]:t.user[n]}),{emailVerification:l,smsVerification:a}=yield(0,d.zz)(i,o);if("email"===e&&!l||"sms"===e&&!a)throw new r.Sg(`could not get ${e} verification data from api`);return Object.assign(Object.assign({},t),{emailVerification:l,smsVerification:a})}))),[i]),w=(0,o.useCallback)((i=>(0,n.s)(void 0,[i],void 0,(function*({updateUserProfileResponse:i,missingFields:o,destination:r}){const d=yield m(r,i),{displayDestination:a,verificationUUID:s}=((e,t)=>{var i,n,o,r,d,a,s;return"email"===t?{displayDestination:null===(i=e.emailVerification)||void 0===i?void 0:i.email,verificationUUID:null===(n=e.emailVerification)||void 0===n?void 0:n.verificationUUID}:{displayDestination:(0,l.q)("+"+(null!==(r=null===(o=e.smsVerification)||void 0===o?void 0:o.phoneCountryCode)&&void 0!==r?r:"")+(null!==(a=null===(d=e.smsVerification)||void 0===d?void 0:d.phoneNumber)&&void 0!==a?a:"")),verificationUUID:null===(s=e.smsVerification)||void 0===s?void 0:s.verificationUUID}})(d,r);t(a),e(s);const c=e=>(0,n.s)(void 0,void 0,void 0,(function*(){return v(w,e,r,s)}));return"email"===r?{isEmailVerificationRequired:!0,isSmsVerificationRequired:!1,missingFields:o,updateUserProfileResponse:d,verifyOtp:c}:{isEmailVerificationRequired:!1,isSmsVerificationRequired:!0,missingFields:o,updateUserProfileResponse:d,verifyOtp:c}}))),[m,t,e,v]);return w}},60036:(e,t,i)=>{i.d(t,{D:()=>r}),i(96540),i(83650),i(46759),i(69648),i(88393),i(80066),i(74848);var n=i(41253),o=(i(95821),i(60445),i(3418),i(48702),i(10941),i(16219),i(12174),i(29109),i(54769),i(60337),i(4402),i(11011),i(40337),i(81285),i(45468),i(99157),i(7116),i(20433),i(83073),i(21029),i(47979),i(63055),i(28765),i(40961),i(20545),i(50574),i(451),i(30593),i(7085),i(87237),i(80607),i(6864),i(29147),i(72366),i(55537),i(65381),i(75705),i(27373),i(95081),i(100),i(58080),i(53006),i(11012),i(71172),i(14624),i(44432),i(79903),i(53454),i(74566),i(85168),i(71092),i(26968),i(56950),i(43433),i(87583),i(30261),i(96696),i(58169),i(23121),i(4623),i(22923),i(44917),i(94734),i(26490),i(10647),i(78080),i(95253),i(44719),i(79620),i(59553),i(31448),i(98592),i(18983),i(21858),i(80622),i(31825),i(89809));const r=()=>{const{bridgeChains:e,bridgeChainsToConnect:t,setShowAuthFlow:i,bridgeOnboardingCompleted:r,setBridgeOnboardingCompleted:l}=(0,o.J)(),{setView:d,goToInitialView:a}=(0,n.At)();return{handleWalletsToConnect:({walletConnector:n})=>{if(e)return t?0===t.length?(i(!1),a()):n&&n.connectedChain?void(0===t.filter((e=>e.chain!==(null==n?void 0:n.connectedChain))).length?r?(i(!1),a()):(l(!0),d("bridge-summary")):d("bridge-next-wallet-connection")):(i(!1),a()):(l(!0),void i(!1));i(!1)}}}},22312:(e,t,i)=>{i.d(t,{M:()=>o});var n=i(96540);const o=({initialValue:e=!1,falseOnClick:t=!1,onHover:i,onHoverOff:o})=>{const[r,l]=(0,n.useState)(e);return[r,{onMouseDown:()=>l(!0),onMouseEnter:()=>{null==i||i(),l(!0)},onMouseLeave:()=>{null==o||o(),l(!1)},onMouseUp:()=>l(t)}]}}}]);