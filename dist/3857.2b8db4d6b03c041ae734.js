"use strict";(self.webpackChunkibc_transfer_ui=self.webpackChunkibc_transfer_ui||[]).push([[3857],{97612:(e,i,d)=>{d.d(i,{M:()=>h});var n=d(29109),t=d(74848),o=d(96540),a=d(95081),r=d(88393),l=d(80066),s=(d(60445),d(100),d(58080),d(12174),d(83650),d(46759),d(69648),d(57921)),c=d(41253),v=(d(95821),d(3418),d(48702),d(10941),d(16219),d(89809)),_=(d(54769),d(60337),d(4402),d(11011),d(40337),d(81285),d(45468),d(99157),d(7116),d(20433),d(83073),d(21029),d(47979),d(63055),d(28765),d(40961),d(20545),d(50574),d(451),d(30593),d(7085),d(87237),d(80607),d(6864),d(29147),d(72366),d(55537),d(65381),d(75705),d(27373),d(83178)),m=(d(58169),d(53006),d(74566),d(85168),d(71092),d(79620),d(22923),d(23121),d(59553),d(51645)),u=d(17632),y=d(44128),b=(d(78080),d(11012));d(79903),d(30261),d(96696),d(44719),d(14624),d(53454),d(31448),d(95253),d(98592),d(18983),d(21858),d(4623),d(44917),d(94734),d(26490),d(10647),d(26968),d(80622),d(31825),d(71172),d(44432),d(56950),d(43433),d(87583);const h=()=>{const{setView:e}=(0,c.At)(),{clearStatesOnBackClick:i,selectedWalletConnector:d}=(0,v.J)(),{t:h}=(0,a.Bd)();if(d&&!(0,l.VC)(d))throw new Error("Wallet connector is not email provider");const p=d,w=(0,o.useCallback)((()=>(0,n.s)(void 0,void 0,void 0,(function*(){yield null==p?void 0:p.endSession(),e("login-with-email-or-wallet"),i()}))),[e,p,i]);return(0,t.jsxs)("div",{className:"email-confirmation-waiting-view",children:[(0,t.jsx)("div",{className:"email-confirmation-waiting-view__header-icon",children:(0,t.jsx)(m.x,{Icon:r.ei,iconSize:80,isSpinning:!0})}),(0,t.jsx)(y.o,{weight:"medium",variant:"title",color:"primary",className:"email-confirmation-waiting-view__title",copykey:"dyn_email_confirmation.title",children:h("dyn_email_confirmation.title")}),(0,t.jsx)(y.o,{weight:"regular",variant:"body_normal",color:"secondary",copykey:"dyn_email_confirmation.description",children:h("dyn_email_confirmation.description")}),(0,t.jsxs)("div",{className:"email-confirmation-waiting-view__email-container",children:[(0,t.jsx)(y.o,{variant:"body_normal",color:"secondary",weight:"medium",as:"span",children:null==p?void 0:p.email}),(0,t.jsx)(b.K,{onClick:w,className:"email-confirmation-waiting-view__edit-icon-button","data-testid":"email-confirmation-waiting-view__edit-button",children:(0,t.jsx)(u.I,{color:"text-tertiary",children:(0,t.jsx)(s.h,{})})})]}),(0,t.jsx)("div",{className:"email-confirmation-waiting-view__note",children:(0,t.jsx)(y.o,{weight:"regular",variant:"body_small",color:"secondary",copykey:"dyn_email_confirmation.note",children:h("dyn_email_confirmation.note")})}),(0,t.jsx)(_.r,{classNameRoot:"email-confirmation-waiting-view__powered_by_dynamic_footer"})]})}},22267:(e,i,d)=>{d.d(i,{S:()=>M});var n=d(29109),t=d(74848),o=d(96540),a=d(95081),r=d(80066),l=d(90054),s=(d(100),d(58080),d(12174)),c=(d(60445),d(83650),d(46759),d(69648)),v=(d(88393),d(56794)),_=d(8383),m=d(41253),u=(d(95821),d(3418),d(48702),d(10941),d(16219),d(89809)),y=(d(54769),d(60337)),b=d(87225),h=d(86713),p=(d(4402),d(11011),d(96345)),w=(d(40337),d(30325)),x=(d(81285),d(23431)),g=d(12707),f=(d(99157),d(45468),d(7116),d(81149)),k=(d(21029),d(47979),d(63055),d(1259)),j=(d(40961),d(20545),d(11823)),N=d(30447),I=(d(50574),d(75988)),C=d(28765),S=(d(451),d(65042)),E=d(32482),W=(d(30593),d(68248)),A=(d(83073),d(6864),d(29147),d(72366),d(55537),d(65381),d(75705),d(20433),d(27373),d(44128)),P=d(5678),R=(d(58169),d(53006),d(74566),d(85168),d(71092),d(79620),d(22923),d(23121),d(59553),d(51645)),V=d(17632),z=d(7085),O=(d(87237),d(78080),d(11012),d(79903),d(46136)),K=(d(30261),d(96696),d(44719),d(14624),d(53454),d(31448),d(95253),d(98592),d(80607),d(18983),d(21858),d(88616)),T=(d(4623),d(44917),d(94734),d(97891)),F=(d(26490),d(10647),d(18334)),D=d(94932),B=d(21416);d(26968),d(80622),d(31825),d(71172),d(44432),d(56950),d(43433),d(87583);const M=({isEmailRecoveryFlow:e=!1,showRetryButton:i=!0,showTransferMessage:d=!1})=>{var M,U,H,L;const{environmentId:J,handleLogOut:q,setShowAuthFlow:Y,projectSettings:Z,user:Q,userWithMissingInfo:G,walletConnectorOptions:X,primaryWallet:$}=(0,u.J)(),{setView:ee,goToInitialView:ie}=(0,m.At)(),{error:de,setError:ne,setErrorMessage:te}=(0,y.pu)(),{loading:oe,setLoading:ae}=(0,z.nk)(),[re,le]=(0,o.useState)(i),[se,ce]=(0,o.useState)(d),{getEOAWallet:ve}=(0,I.R)(),[_e,me]=(0,o.useState)(!1),ue=(0,o.useRef)(_e),ye=e=>{me(e),ue.current=e},{displayedDestination:be,verificationUUID:he,setVerificationUUID:pe}=(0,C.vm)(),{t:we}=(0,a.Bd)(),{addRecoveryEmail:xe}=(0,E.V)(),{isTurnkeyWallet:ge,hasTurnkeyVerifiedCredentialAuthenticator:fe,hasRecoveryEmail:ke}=(0,P.b)(),je=(0,w.A)(Z),{initAuth:Ne,completeAuth:Ie,cancelAuth:Ce}=(0,W.r)({authMethod:"email"}),{verifyOneTimePassword:Se,retryOneTimePassword:Ee}=(0,T.N)(),{generateSessionKey:We,shouldRegisterSessionKeysOnSignin:Ae}=(0,N.t)({environmentId:J,projectSettings:Z}),Pe=(0,o.useRef)(!0);(0,S.X)((()=>{if(!Pe.current)return;const e=null!=be?be:"";s.zm.emit("emailVerificationResult",ue.current,e),ue.current||s.zm.emit("authFailure",{email:e,option:e,type:"email"},"user-cancelled"),be||c.v.warn("WARNING: emitted emailVerificationResult with incomplete params because useVerification's displayedDestination was undefined")}));const{verifyOtp:Re}=(0,k.b)(),Ve=(0,o.useCallback)((i=>(0,n.s)(void 0,void 0,void 0,(function*(){var d,n,t,o,a,l;if("verified-and-transferred"===i.nextView&&(null==ce||ce(!0)),e)return ee("passkey-recovery-add-email",{canSkipAddingEmail:!1,isFromEmailVerification:!0}),!0;if(!ge)return!1;if(fe&&!ke&&(null===(d=null==i?void 0:i.user)||void 0===d?void 0:d.email))return(0,g.n)(i),yield xe(i.user.email),Y(!1),!0;if(je){const e=null===(t=null===(n=null==Z?void 0:Z.sdk)||void 0===n?void 0:n.embeddedWallets)||void 0===t?void 0:t.automaticEmbeddedWalletCreation,d=$&&ve($),c=$&&(0,r.vh)($)||d&&(0,r.vh)(d),v=Boolean(e&&(!(null===(a=null===(o=null==Z?void 0:Z.sdk)||void 0===o?void 0:o.embeddedWallets)||void 0===a?void 0:a.forceAuthenticatorAtSignup)||c));if(v){const e=(0,j.x)(Z),d=(0,h.v)((0,b.I)(i.user),[e]);if(!d)throw new Error("Could not find an embedded wallet");const n=null==X?void 0:X.find((e=>e.key===d.walletName));if(!(null==n?void 0:n.walletConnector))throw new Error("Could not find connector for embedded wallet");const t=n.walletConnector.createWallet({address:d.address||"",chain:n.walletConnector.connectedChain,connector:n.walletConnector,id:d.id,isAuthenticated:!1,key:null!==(l=d.walletName)&&void 0!==l?l:""});(0,f.q)(d.id),s.zm.emit("embeddedWalletCreated",t,d,Q)}if(v||!e)return Y(!1),!0}return!1}))),[e,ge,fe,ke,je,ee,xe,Y,null===(U=null===(M=null==Z?void 0:Z.sdk)||void 0===M?void 0:M.embeddedWallets)||void 0===U?void 0:U.automaticEmbeddedWalletCreation,null===(L=null===(H=null==Z?void 0:Z.sdk)||void 0===H?void 0:H.embeddedWallets)||void 0===L?void 0:L.forceAuthenticatorAtSignup,$,ve,X,Q]),ze=(0,o.useCallback)((i=>(0,n.s)(void 0,void 0,void 0,(function*(){return ne(void 0),ae(!0),Q||G?he?Ie({completeSignInFlow:e=>(0,n.s)(void 0,void 0,void 0,(function*(){return Ve(e)})),onValidUpdatedJwt:()=>{ye(!0)},options:{email:be,isEmailRecoveryFlow:e},updateJwtFunction:()=>(0,n.s)(void 0,void 0,void 0,(function*(){return Re(i,"email",he)}))}):Ce():Ne({onVerifySuccess:()=>ye(!0),options:{email:be},showSuccessMessage:!0,verifyFunction:()=>(0,n.s)(void 0,void 0,void 0,(function*(){if(!he)return Se(i,{skipSetUserAndAuthToken:!0});let e;return Ae()&&(e=(yield We()).publicKey),(0,x.AE)({environmentId:J,sessionPublicKey:e,verificationToken:i,verificationUUID:he})}))})}))),[ne,ae,he,Q,G,Ie,be,e,Ce,Ne,J,Ve,Re,Se]),Oe=(0,o.useMemo)((()=>e=>(0,t.jsx)(V.I,{color:"brand-primary",children:(0,t.jsx)(_.h,Object.assign({},e))})),[]);return(0,t.jsxs)(t.Fragment,{children:[de&&(0,t.jsx)(O.O,{withIcon:!1,className:"email-verification__error-message",children:de}),(0,t.jsxs)("div",{className:(0,l.x)("email-verification__container",{"email-verification__container--error":Boolean(de)}),children:[se&&(0,t.jsx)("div",{className:"email-verification__transfer-message",copykey:"dyn_otp_verification.email.complete",children:we("dyn_otp_verification.email.complete")}),_e?(0,t.jsx)("div",{className:"email-verification__icon-container",children:(0,t.jsx)(K.U,{containerClassName:"email-verification__icon--verified",Icon:Oe,iconSize:64,InnerIcon:v.h})}):(0,t.jsx)(R.x,{Icon:Oe,iconSize:96,isSpinning:!0,className:"email-verification__icon-with-spinner"}),(0,t.jsxs)("div",{className:"email-verification__copy-text-container",children:[(0,t.jsx)(A.o,{variant:"body_normal",weight:"regular",color:"secondary",copykey:"dyn_otp_verification.description",children:we("dyn_otp_verification.description")}),(0,t.jsx)(A.o,{variant:"body_normal",weight:"bold",color:"secondary",children:(0,p.E)(be)})]}),(0,t.jsx)(F.s,{initialValue:Array(6).fill(""),isLoading:oe,handleComplete:ze,isValidated:_e,inputMode:"numeric",pattern:"[0-9]*",hasError:Boolean(de),onChange:()=>ne(void 0)}),re&&(0,t.jsx)(D.a,{className:"email-verification__retry-container",retryHandler:()=>(0,n.s)(void 0,void 0,void 0,(function*(){try{if(ae(!0),!he||!be)return yield Ee(),pe(void 0),void ne(void 0);const{verificationUUID:e}=yield(0,x.qc)({email:be,environmentId:J,verificationUUID:he});pe(e),ne(void 0)}catch(e){c.v.debug(e),te(e.code),"too_many_email_verification_attempts"===e.code&&le(!1),"invalid_email_verification"===e.code&&ie()}finally{ae(!1)}})),secondsToRetry:15}),(Q||G)&&!e&&(0,t.jsx)(B.Q,{className:"email-verification__log-out",onClick:q,copykey:"dyn_otp_verification.log_out_button",children:we("dyn_otp_verification.log_out_button")})]})]})}},58626:(e,i,d)=>{d.d(i,{F:()=>m});var n=d(74848),t=d(96540),o=d(80066),a=(d(60445),d(100),d(58080),d(12174)),r=(d(29109),d(83650),d(46759),d(69648),d(88393),d(41253)),l=(d(95821),d(3418),d(48702),d(10941),d(16219),d(89809)),s=(d(54769),d(60337),d(4402),d(11011),d(96345)),c=(d(40337),d(81285),d(45468),d(99157),d(7116),d(20433),d(83073),d(21029),d(47979),d(63055),d(28765),d(40961),d(20545),d(50574),d(451),d(32708)),v=(d(30593),d(7085),d(87237),d(80607),d(6864),d(29147),d(72366),d(55537),d(65381),d(75705),d(27373),d(95081),d(58169),d(53006),d(74566),d(85168),d(71092),d(79620),d(22923),d(23121),d(59553),d(78080),d(11012),d(79903),d(30261),d(96696),d(44719),d(14624),d(53454),d(31448),d(95253),d(98592),d(18983),d(21858),d(4623),d(44917),d(94734),d(26490),d(10647),d(36170)),_=(d(26968),d(80622),d(31825),d(55228));d(71172),d(44432),d(56950),d(43433),d(87583);const m=()=>{const{setView:e}=(0,r.At)(),[i,d]=(0,t.useState)(),{selectedWalletConnector:m,clearStatesOnBackClick:u}=(0,l.J)();if(!m||!(0,o.oz)(m))throw new Error("Current wallet is not EmailWalletConnector");const{email:y}=m;if(!y)throw new Error("EmailWalletOtpVerificationView requires a email");const b=()=>{m.clearEmail(),u(),e("login-with-email-or-wallet"),a.zm.emit("authFailure",{email:y,option:y,type:"email"},"user-cancelled")},{data:h,isLoading:p,mutate:w}=(0,c.n)((e=>m.verifyOneTimePassword(e)),{onFailure:e=>{d(e),a.zm.emit("emailVerificationResult",!1,y)},onSuccess:()=>{a.zm.emit("emailVerificationResult",!0,y)}});return(0,n.jsx)(v.K,{MainIcon:_.a,displayedDestination:(0,s.E)(y),error:i,onClickBack:b,isLoading:p,onPinComplete:w,isValid:!0===h,retryHandler:m.retryOneTimePassword.bind(m),onPinChange:()=>d(void 0),onClickEditDestination:b,successBannerTextKey:"dyn_magic_verification.banner_text"})}},24906:(e,i,d)=>{d.d(i,{P:()=>h});var n=d(29109),t=d(74848),o=d(96540),a=d(95081),r=d(60445),l=(d(100),d(58080),d(12174),d(83650),d(46759),d(69648),d(88393),d(80066),d(42035)),s=(d(41253),d(95821),d(3418),d(48702),d(10941),d(16219),d(89809)),c=(d(54769),d(60337),d(4402),d(11011),d(40337),d(81285),d(45468),d(96515)),v=(d(99157),d(7116),d(20433),d(83073),d(21029),d(47979),d(63055),d(28765),d(40961),d(20545),d(50574),d(75988)),_=(d(451),d(30593),d(7085),d(87237),d(80607),d(6864),d(29147),d(72366),d(55537),d(65381),d(75705),d(27373),d(44128)),m=(d(58169),d(53006),d(74566),d(85168),d(71092),d(79620),d(22923),d(23121),d(59553),d(78080),d(11012),d(79903),d(46136)),u=d(36100),y=(d(30261),d(96696),d(44719),d(14624),d(53454),d(31448),d(95253),d(98592),d(18983),d(85439)),b=(d(21858),d(4623),d(44917),d(94734),d(26490),d(10647),d(23536));d(26968),d(80622),d(31825),d(71172),d(44432),d(56950),d(43433),d(87583);const h=()=>{const{primaryWallet:e,setShowAuthFlow:i,environmentId:d,handleLogOut:h}=(0,s.J)(),[p,w]=(0,o.useState)(!1),[x,g]=(0,o.useState)(void 0),{t:f}=(0,a.Bd)(),[k,j]=(0,o.useState)(!1),{isSmartWallet:N,getEOAWallet:I}=(0,v.R)(),C=(0,o.useMemo)((()=>{if(x){if(x instanceof r.ii)return x.message;try{return(0,y.y)(x)}catch(e){return"An unexpected error occured while deleting your embedded wallets."}}}),[x]),S=(0,t.jsx)("div",{children:(0,t.jsx)("div",{className:"embedded-delete-view__body__description",children:(0,t.jsx)("div",{className:"embedded-delete-view__header",children:(0,t.jsx)(l.h,{})})})});return(0,t.jsxs)("div",{className:"embedded-delete-view",children:[(0,t.jsx)("div",{className:"embedded-delete-view__body",children:S}),C&&(0,t.jsx)(m.O,{children:C}),(0,t.jsxs)("div",{className:"embedded-delete-view__body__card",children:[(0,t.jsx)(_.o,{variant:"body_normal",color:"primary",style:{letterSpacing:"-0.15px"},copykey:"dyn_embedded_delete.description_1",children:f("dyn_embedded_delete.description_1")}),(0,t.jsx)(_.o,{variant:"body_normal",color:"primary",style:{fontWeight:"bold",letterSpacing:"-0.15px"},copykey:"dyn_embedded_delete.description_2",children:f("dyn_embedded_delete.description_2")})]}),(0,t.jsx)("div",{className:"embedded-delete-view__body__confirm_card",children:(0,t.jsxs)("button",{className:"embedded-delete-view__body__card__acknowledgement","data-testid":"embedded-delete-checkbox",onClick:()=>w(!p),children:[(0,t.jsx)("div",{children:(0,t.jsx)(b.S,{checked:p,className:"embedded-delete-view__body__card__statement__checkbox",id:"embedded-reveal-checkbox-1"})}),(0,t.jsx)("div",{children:(0,t.jsx)(_.o,{variant:"body_small",color:"primary",style:{letterSpacing:"-0.15px"},copykey:"dyn_embedded_delete.acknowledgement",children:f("dyn_embedded_delete.acknowledgement")})})]})}),(0,t.jsxs)("div",{className:"embedded-delete-view__body__cta_button_wrapper",children:[(0,t.jsx)(u.E,{buttonPadding:"large",buttonVariant:"primary",typographyProps:{color:"inherit"},onClick:()=>i(!1),disabled:!1,loading:!1,dataTestId:"embedded-delete-cancel-button",copykey:"dyn_embedded_delete.cancel_button",buttonClassName:"embedded-delete-view__body__button",children:f("dyn_embedded_delete.cancel_button")}),(0,t.jsx)(u.E,{buttonPadding:"large",buttonVariant:"brand-primary",typographyProps:{color:"inherit",style:{fontSize:"13px"}},onClick:()=>(0,n.s)(void 0,void 0,void 0,(function*(){var i;if(e){j(!0);try{const n=yield(0,c.V4)({environmentId:d}),t=N(e)?null===(i=I(e))||void 0===i?void 0:i.connector:null==e?void 0:e.connector,o=yield t.stampDeleteSubOrganizationRequest({request:n});yield(0,c.iD)({deleteEmbeddedWalletsRequest:o,environmentId:d}),h()}catch(e){g(e)}finally{j(!1)}}})),disabled:k||!p,loading:k,dataTestId:"embedded-delete-action-button",copykey:"dyn_embedded_delete.action_button",buttonClassName:"embedded-delete-view__body__button",children:f("dyn_embedded_delete.action_button")})]})]})}},18685:(e,i,d)=>{d.d(i,{v:()=>O});var n=d(29109),t=d(74848),o=d(96540),a=d(95081),r=d(60445),l=d(80066),s=d(82544),c=d(23536),v=d(46136),_=d(11012),m=d(95540),u=d(53006),y=d(44128),b=d(36100),h=d(45468),p=(d(83650),d(46759),d(69648)),w=(d(88393),d(91398)),x=d(32802),g=d(52085),f=d(36168),k=d(83325),j=d(41253),N=(d(95821),d(3418),d(48702),d(10941),d(16219),d(12174)),I=(d(54769),d(60337),d(4402),d(11011),d(40337),d(81285),d(99157),d(7116),d(20433),d(83073),d(21029),d(47979),d(63055),d(28765),d(40961),d(20545),d(50574),d(75988)),C=(d(451),d(32708)),S=d(5678),E=d(80426),W=(d(30593),d(7085),d(87237),d(40166)),A=(d(80607),d(6864),d(29147),d(72366),d(55537),d(65381),d(75705),d(27373),d(100),d(58080),d(71172),d(14624),d(44432),d(79903),d(53454),d(74566),d(85168),d(71092),d(24536)),P=(d(26968),d(56950),d(43433),d(87583),d(30261),d(96696),d(58169),d(23121),d(4623),d(22923),d(44917),d(94734),d(26490),d(10647),d(85439)),R=d(78080);d(95253),d(44719),d(79620),d(59553),d(31448),d(98592),d(18983),d(21858),d(80622);var V=d(26048),z=(d(31825),d(89809));const O=({exportPrivateKey:e,isPromptForExport:i=!1})=>{var d,O,K,T;const{primaryWallet:F,user:D,setShowAuthFlow:B,environmentId:M}=(0,z.J)(),{handleAcknowledgeExportPrompt:U}=(0,V.E)(),{isTurnkeyWallet:H}=(0,S.b)(),{shadowRoot:L}=(0,u.lt)(),{setDynamicWidgetView:J}=(0,R.pJ)(),{setView:q}=(0,j.At)(),{getEOAWallet:Y,isSmartWallet:Z}=(0,I.R)(),[Q,G]=(0,o.useState)(!1),[X,$]=(0,o.useState)(!1),ee=(0,o.useRef)(null),ie=null===(O=null===(d=null==D?void 0:D.verifiedCredentials)||void 0===d?void 0:d.find((({walletName:e})=>null==e?void 0:e.startsWith("turnkey"))))||void 0===O?void 0:O.walletProperties,de=null==ie?void 0:ie.turnkeyHDWalletId,ne=null!==(K=F&&Y(F))&&void 0!==K?K:F,te=ne&&(0,l.hz)(ne.connector);(0,o.useEffect)((()=>()=>{H&&(0,W.pY)({wallet:ne})}),[]);const{isLoading:oe}=(0,E.v)((()=>(0,n.s)(void 0,void 0,void 0,(function*(){var e,i;const d=ee.current;if(d&&!((null===(e=null==d?void 0:d.children)||void 0===e?void 0:e.length)>0))return(0,l.SE)(null==ne?void 0:ne.connector)&&(yield null===(i=null==ne?void 0:ne.connector)||void 0===i?void 0:i.createOrRestoreSession()),(0,W.Ri)({iframeContainer:d,iframeElementId:"dyn-turnkey-export-element-id",wallet:ne})})))),{mutate:ae,isLoading:re,error:le,data:se}=(0,C.n)((()=>(0,n.s)(void 0,void 0,void 0,(function*(){var i,d,n;if(U(),te)return(null==ne?void 0:ne.connector).exportWalletKeys();if(H)try{return yield(0,W.cY)({address:e?null==ne?void 0:ne.address:void 0,environmentId:M,user:D,wallet:ne})}catch(t){return(0,l.SE)(null==ne?void 0:ne.connector)&&(null===(i=null==ne?void 0:ne.connector)||void 0===i?void 0:i.removeSessionKeys)&&(yield null===(d=null==ne?void 0:ne.connector)||void 0===d?void 0:d.removeSessionKeys(),yield null===(n=null==ne?void 0:ne.connector)||void 0===n?void 0:n.createOrRestoreSession({ignoreRestore:!0})),(0,W.cY)({address:e?null==ne?void 0:ne.address:void 0,environmentId:M,user:D,wallet:ne})}}))),{onFailure:e=>{p.v.error("Failed to export",e),N.zm.emit("embeddedWalletRevealFailed",e)},onSuccess:e=>{var i,d;if(te&&e&&(null==e?void 0:e.length)){const n=null==L?void 0:L.getElementById("coinbase-waas-key-export");null===(i=null==n?void 0:n.contentWindow)||void 0===i||i.postMessage({key:null===(d=e[0])||void 0===d?void 0:d.ecKeyPrivate,type:"export_key"},"*"),$(!0)}}}),ce=(0,o.useMemo)((()=>{if(le){if(le instanceof r.ii)return le.message;try{return(0,P.y)(le)}catch(e){return void(e instanceof r.Dj&&q("access-blocked"))}}}),[le,q]),{t:ve}=(0,a.Bd)(),_e=(0,t.jsxs)("div",{children:[F&&Z(F)&&!re&&se&&!le&&(0,t.jsxs)("div",{className:"embedded-reveal-view__zerodev-warning",children:[(0,t.jsxs)("div",{className:"embedded-reveal-view__zerodev-warning__title-row",children:[(0,t.jsx)(f.h,{className:"embedded-reveal-view__zerodev-warning__icon"}),(0,t.jsx)(y.o,{variant:"body_normal",weight:"bold",copykey:"dyn_embedded_reveal.aa_warning.title",children:ve("dyn_embedded_reveal.aa_warning.title")})]}),(0,t.jsxs)(y.o,{variant:"body_normal",weight:"regular",copykey:"dyn_embedded_reveal.aa_warning.subtitle",children:[ve("dyn_embedded_reveal.aa_warning.subtitle"),(0,t.jsx)("button",{onClick:()=>{B(!1),J("send-balance")},className:"embedded-reveal-view__zerodev-warning__link-button",children:(0,t.jsx)(y.o,{variant:"body_normal",weight:"regular",color:"primary",className:"underline",copykey:"dyn_embedded_reveal.aa_warning.button",children:ve("dyn_embedded_reveal.aa_warning.button")})})]})]}),(0,t.jsx)("div",{className:"embedded-reveal-view__body__description",children:re||!se||le?(0,t.jsx)("div",{className:"embedded-reveal-view__header",children:(0,t.jsx)("div",{className:"embedded-reveal-view__header__hero",children:(0,t.jsx)(x.h,{})})}):(0,t.jsx)(y.o,{variant:"body_normal",color:"secondary",weight:"regular",children:ve("dyn_embedded_reveal.reveal_description")})})]});(0,o.useEffect)((()=>{var i;if((null===(i=null==ee?void 0:ee.current)||void 0===i?void 0:i.children)&&se){const i=ee.current.children[0];null==i||i.setAttribute("style",!de||e?"height: 60px":"height: 100px")}}),[ee,se,de,e]);const me=(0,t.jsx)(_.K,{onClick:()=>B(!1),type:"button",children:(0,t.jsx)(w.h,{})}),ue=!re&&se&&!le,ye=ve(!de||e?"dyn_embedded_reveal.private_key_title":"dyn_embedded_reveal.recovery_phrase_title"),be=ue?ye:ve(i?"dyn_embedded_reveal.prompt_for_export_title":"dyn_embedded_reveal.agreement_title"),he=(0,t.jsx)("iframe",{src:null===(T=null===h.A||void 0===h.A?void 0:h.A.getBaseUrl())||void 0===T?void 0:T.replace("api/v0","coinbase-waas-key-export.html"),id:"coinbase-waas-key-export",title:"Coinbase WaaS key export",height:X?"100%":0,width:X?"100%":0,style:{borderRadius:"0.75rem"},allow:"clipboard-write"});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(m.r,{trailing:i?null:me,children:(0,t.jsx)(y.o,{as:"h1",variant:"title",color:"primary","data-testid":"dynamic-auth-modal-heading",className:"header__typography",children:be})}),(0,t.jsx)("div",{className:"embedded-reveal-view",children:(0,t.jsxs)("div",{className:"embedded-reveal-view__body",children:[_e,te&&he,H?(0,t.jsx)("div",{id:"dyn-turnkey-export-container-id",style:{display:se?"block":"none"},ref:ee}):null,ue?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(b.E,{buttonPadding:"large",buttonVariant:"brand-primary",onClick:()=>B(!1),loading:re,copykey:"dyn_embedded_reveal.done_button_label",typographyProps:{color:"inherit"},children:ve("dyn_embedded_reveal.done_button_label")}),!e&&(0,t.jsx)(b.E,{buttonClassName:"embedded-reveal-view__body__unlink_button",buttonVariant:"tertiary",buttonPadding:"none",copykey:"dyn_embedded_reveal.unlink",onClick:()=>{q("embedded-delete-view")},typographyProps:{color:"secondary",variant:"button_tertiary"},children:ve("dyn_embedded_reveal.unlink")})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"embedded-reveal-view__body__description",children:[(0,t.jsx)("div",{className:"embedded-reveal-view__body__badge-container",children:(0,t.jsx)(s.E,{text:ve("dyn_embedded_reveal.badge_label"),className:"embedded-reveal-view__body__badge"})}),(0,t.jsx)(y.o,{variant:"body_normal",color:"primary",weight:"regular",copykey:"dyn_embedded_reveal.prompt_for_export_description",children:ve("dyn_embedded_reveal.prompt_for_export_description")})]}),ce&&(0,t.jsx)(v.O,{children:ce}),(0,t.jsxs)("div",{className:"embedded-reveal-view__body__card",children:[(0,t.jsxs)("div",{className:"embedded-reveal-view__body__card__statement",children:[(0,t.jsx)("div",{className:"embedded-reveal-view__body__card__icon",children:(0,t.jsx)(k.h,{height:16,width:16})}),(0,t.jsxs)("div",{className:"embedded-reveal-view__body__card__statement__text",children:[(0,t.jsxs)(y.o,{variant:"body_small",color:"primary",copykey:"dyn_embedded_reveal.statement_1.title",children:[ve("dyn_embedded_reveal.statement_1.title"),":"]}),(0,t.jsx)(y.o,{variant:"body_small",color:"primary",copykey:"dyn_embedded_reveal.statement_1.description",children:ve("dyn_embedded_reveal.statement_1.description")})]})]}),(0,t.jsxs)("div",{className:"embedded-reveal-view__body__card__statement",children:[(0,t.jsx)("div",{className:"embedded-reveal-view__body__card__icon",children:(0,t.jsx)(g.h,{height:16,width:16})}),(0,t.jsx)("div",{className:"embedded-reveal-view__body__card__statement__text",children:(0,t.jsx)(y.o,{variant:"body_small",color:"primary",copykey:"dyn_embedded_reveal.statement_2.title",children:ve("dyn_embedded_reveal.statement_2.title")})})]})]}),(0,t.jsx)("div",{className:"embedded-reveal-view__body__confirm_card",children:(0,t.jsxs)("button",{className:"embedded-reveal-view__body__card__acknowledgement",onClick:()=>G(!Q),children:[(0,t.jsx)("div",{children:(0,t.jsx)(c.S,{checked:Q,onChange:()=>G(!Q),className:"embedded-reveal-view__body__card__statement__checkbox",id:"embedded-reveal-checkbox-1"})}),(0,t.jsx)("div",{children:(0,t.jsx)(y.o,{variant:"body_small",color:"primary",style:{letterSpacing:"-0.15px"},copykey:"dyn_embedded_reveal.checkbox_label",children:ve("dyn_embedded_reveal.checkbox_label")})})]})}),(0,t.jsx)(A.f,{isExport:!0}),(0,t.jsxs)("div",{className:"embedded-reveal-view__body__button_section",children:[i&&(0,t.jsx)(b.E,{buttonPadding:"large",buttonVariant:"primary",onClick:()=>{U(),B(!1)},dataTestId:"embedded-reveal-button",copykey:"dyn_embedded_reveal.skip_button_label",expanded:!0,buttonClassName:"embedded-reveal-view__body__button",children:ve("dyn_embedded_reveal.skip_button_label")}),(0,t.jsx)(b.E,{buttonPadding:"large",buttonVariant:"brand-primary",typographyProps:{color:"inherit"},onClick:()=>ae(),disabled:!Q||oe,loading:re,dataTestId:"embedded-reveal-button",copykey:"dyn_embedded_reveal.reveal_button_label",style:{width:"100%"},className:"embedded-reveal-view__body__button",expanded:!0,children:ve(i?"dyn_embedded_reveal.backup_button_label":"dyn_embedded_reveal.reveal_button_label")})]})]})]})})]})}},40166:(e,i,d)=>{d.d(i,{Ri:()=>l,cY:()=>s,pY:()=>c});var n=d(29109),t=d(80066),o=d(60445),a=(d(46759),d(45468),d(48702),d(83219)),r=(d(4402),d(69648),d(3418),d(11011),d(88393),d(96540),d(74848),d(41253),d(95821),d(10941),d(16219),d(40337),d(81285),d(20433),d(83073),d(99157),d(96515));d(7116);const l=e=>(0,n.s)(void 0,[e],void 0,(function*({iframeContainer:e,iframeElementId:i,wallet:d}){var n;if(!(null==d?void 0:d.connector)||!(null==d?void 0:d.id)||!(0,t.NO)(null==d?void 0:d.connector))throw new o.ii("Connector is missing. Please make sure you added EthereumWalletConnectors and/or SolanaWalletConnectors to DynamicProvider settings",a.t);const r=null===(n=d.connector)||void 0===n?void 0:n.getExportHandler();if(!(yield r.initExport(e,i)))throw new o.ii("Something went wrong",a.Z4);return r})),s=e=>(0,n.s)(void 0,[e],void 0,(function*({user:e,wallet:i,environmentId:d,address:n}){const{connector:l,turnkeyHDWalletId:s,privateKeyId:c,organizationId:v}=(({user:e,wallet:i})=>{var d,n;if(!e)throw new o.ii(a.nM);if(!(null==i?void 0:i.connector)||!(null==i?void 0:i.id)||!(0,t.NO)(null==i?void 0:i.connector))throw new o.ii("Connector is missing. Please make sure you added EthereumWalletConnectors and/or SolanaWalletConnectors to DynamicProvider settings");const r=i.connector;r.setEmail(e.email);const l=null===(n=null===(d=e.verifiedCredentials)||void 0===d?void 0:d.find((({walletName:e})=>null==e?void 0:e.startsWith("turnkey"))))||void 0===n?void 0:n.walletProperties,s=null==l?void 0:l.turnkeyHDWalletId,c=null==l?void 0:l.turnkeyPrivateKeyId,v=null==l?void 0:l.turnkeySubOrganizationId;if(!v||void 0===s&&void 0===c)throw new o.ii("Invalid token!");return{connector:r,organizationId:v,privateKeyId:c,turnkeyHDWalletId:s}})({user:e,wallet:i}),_=l.getExportHandler();if(!_.publicKey)throw new o.ii("Must initialize export first",a.Z4);let m;s?m=yield _.exportWallet({address:n,organizationId:v,walletId:s}):c&&(m=yield _.exportPrivateKey({organizationId:v,privateKeyId:c}));const u=m.id;let y;if("ACTIVITY_STATUS_COMPLETED"===m.status)y=(({address:e,privateKeyId:i,activity:d})=>{var n,t,o;const a=e?null===(n=d.result)||void 0===n?void 0:n.exportWalletAccountResult:null===(t=d.result)||void 0===t?void 0:t.exportWalletResult,r=i?null===(o=d.result)||void 0===o?void 0:o.exportPrivateKeyResult:a;return null==r?void 0:r.exportBundle})({activity:m,address:n,privateKeyId:c});else{const e=yield(0,r.Qb)({activityId:u,environmentId:d,walletId:(null==i?void 0:i.id)||""});y=null==e?void 0:e.exportBundle}if(!y)throw new o.ii("Invalid export response",a.Z4);return n||c?_.verifyExportPrivateKey({chain:null==i?void 0:i.chain,exportBundle:y,organizationId:v}):_.verifyExportWallet({exportBundle:y,organizationId:v})})),c=e=>(0,n.s)(void 0,[e],void 0,(function*({wallet:e}){var i;const d=null==e?void 0:e.connector;null===(i=null==d?void 0:d.getExportHandler())||void 0===i||i.clear()}))}}]);