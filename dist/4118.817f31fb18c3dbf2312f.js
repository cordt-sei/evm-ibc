"use strict";(self.webpackChunkibc_transfer_ui=self.webpackChunkibc_transfer_ui||[]).push([[4118],{31448:(e,t,n)=>{n.d(t,{t:()=>N});var l=n(29109),a=n(74848),i=n(96540),o=n(95081),s=n(16763),r=n(80066),c=n(60445),d=n(46759),u=(n(83650),n(69648)),_=(n(88393),n(41253),n(95821),n(3418),n(48702),n(15988)),m=(n(10941),n(16219),n(12174),n(54769),n(60337),n(4402),n(11011),n(40337),n(81285),n(45468),n(99157),n(7116),n(20433),n(83073),n(21029),n(47979),n(63055),n(28765),n(40961),n(20545),n(50574),n(67512)),v=n(15652),w=(n(451),n(32708)),y=n(80426),g=(n(30593),n(7085),n(87237),n(80607),n(6864),n(29147),n(72366),n(55537),n(65381),n(75705),n(27373),n(100),n(58080)),h=n(44128),p=(n(53006),n(11012),n(71172),n(14624),n(44432),n(79903),n(53454),n(74566),n(85168),n(71092),n(26968),n(56950),n(43433),n(87583),n(55968)),f=(n(30261),n(96696),n(58169),n(23121),n(4623),n(22923),n(44917),n(94734),n(26490),n(10647),n(78080),n(95253),n(44719),n(90424)),b=(n(79620),n(59553),n(98592),n(52547)),k=(n(18983),n(21858),n(80622),n(31825),n(89809));const x=-32603,j={"-32002":"Insufficient funds for this transaction.",0:"The operation either timed out or was not allowed.",16:"Invalid Passkey signature. Select the passkey for this account and device.",3:"You reached the limit of passkeys for this account.",5:"Invalid Passkey signature.",INSUFFICIENT_FUNDS:"Insufficient funds for this transaction.",[x.toString()]:"A network error has occurred. Please try again later"},S={"provided ENS name resolves to null":"Invalid address. Please check that the entered address is correct."},C=e=>{var t;const n=e;return(null==n?void 0:n.code)||(null===(t=null==n?void 0:n.cause)||void 0===t?void 0:t.code)};var I;!function(e){e.LOADING="loading",e.FAILED="failed",e.SKIPPED="skipped",e.SUCCESS="success"}(I||(I={}));const N=({transaction:e,onError:t,onSuccess:n,mutation:N,onClickBack:W,walletConnector:T,onClickClose:E,title:A,displayPoweredByDynamicFooter:L=!1,copykey:P,hideModal:B,currentToken:O,isNativeToken:D,transactionValue:G,isModal:V,sendBalanceTransaction:$})=>{const{primaryWallet:K,environmentId:z}=(0,k.J)(),[R,U]=(0,i.useState)(!1),M=(0,m.C)(),{t:J}=(0,o.Bd)(),{currency:H}=(0,p.D)(T),q=(0,i.useMemo)((()=>{if(!(null==K?void 0:K.connector))return;const e=K.connector;return e._selectedChainId||e.lastUsedChainId}),[null==K?void 0:K.connector]),[Q,Z]=(0,i.useState)({status:I.LOADING}),[X,Y]=(0,i.useState)(void 0),ee=(0,i.useCallback)((()=>(0,l.s)(void 0,void 0,void 0,(function*(){var t,n,l,a,i,o,r;if(Q.status===I.LOADING)if($||B)Z({status:I.SKIPPED});else{if(!K||!q&&"SOL"!==(null==K?void 0:K.chain))return u.v.error("[TransactionConfirmationView] Simulation failed:",{chain:null==K?void 0:K.chain,chainId:q,primaryWallet:K}),void Z({status:I.FAILED});try{let c;if("zerodev"===K.connector.key){const a=K.connector,{userOperation:i}=yield a.getCurrentUserOperation(e);if(!i)return void Z({status:I.FAILED});{const o=yield a.formatUserOperation(i);e.fee.gas=F(i);const s=yield null===(t=a.getAccountAbstractionProvider())||void 0===t?void 0:t.account.entryPoint;if(!s)return u.v.error("[TransactionConfirmationView] Simulation failed: No entry point address found"),void Z({status:I.FAILED});Y(null===(n=null==e?void 0:e.getTransactionRecipient)||void 0===n?void 0:n.call(e)),c=yield(0,b.aP)({chainId:String(q),entryPoint:s,environmentId:z,userOperation:o,value:(null===(l=e.value)||void 0===l?void 0:l.toString())||"0"})}}else if(q)Y(null===(i=null==e?void 0:e.getTransactionRecipient)||void 0===i?void 0:i.call(e)),c=yield(0,b.oB)({chainId:String(q),data:e.data||"0x",environmentId:z,from:e.from,to:e.to||"",value:(null===(o=e.value)||void 0===o?void 0:o.toString())||"0"});else{const t=null===(a=e.multipleTransactions)||void 0===a?void 0:a.map((e=>s.encode(e.serialize({requireAllSignatures:!1}))));if(!t)return u.v.error("[TransactionConfirmationView] Simulation failed: No encoded transactions"),void Z({status:I.FAILED});c=yield(0,b.si)({accountAddress:e.from,chain:yield null==T?void 0:T.getNetwork(),environmentId:z,transactions:t})}if(!c&&"zerodev"!==(null===(r=K.connector)||void 0===r?void 0:r.key))return u.v.warn("[TransactionConfirmationView] Simulation failed: No result"),void Z({status:I.FAILED});Z(c?{result:c,status:I.SUCCESS}:{status:I.FAILED})}catch(e){u.v.error("[TransactionConfirmationView] Simulation failed:",e),Z({status:I.FAILED})}}}))),[$,B,K,q,z,e,T]);(0,i.useEffect)((()=>{Q.status!==I.SUCCESS&&Q.status!==I.SKIPPED&&ee()}),[ee,null==K?void 0:K.connector,Q.status]);const te=(0,i.useCallback)((()=>{var t;(null==K?void 0:K.chain)===d.lVq.Sol&&void 0!==e.fee.gas||K&&"zerodev"===(null===(t=K.connector)||void 0===t?void 0:t.key)||e.fetchFee().finally(M)}),[null==K?void 0:K.chain,e,M]),{isLoading:ne}=(0,y.v)((()=>!!(0,r.Pg)(T)&&T.canSponsorTransactionGas(e)),{initialData:!1,onReject:u.v.error,onResolve:e=>{U(e),!e&&(0,r.Pg)(T)&&T.disableGasSponsorshipOnce()}});(0,i.useEffect)((()=>{var t;(null===(t=e.isGasSponsored)||void 0===t?void 0:t.call(e))&&U(!0)}),[e]);const{mutate:le,isLoading:ae,error:ie}=(0,w.n)(N,{onFailure:(0,i.useCallback)((e=>{te(),c.F6.isInstance(e)&&(u.v.debug(e),U(!1),(0,r.Pg)(T)&&T.disableGasSponsorshipOnce()),u.v.error(e),null==t||t(e)}),[te,t,T]),onSuccess:(0,i.useCallback)((e=>null==n?void 0:n(e)),[n])});(0,v.$)(te,ae?null:2e4),(0,_.S)(te);const oe=(({transactionValue:e,gasTotalPrice:t,isGasSponsored:n=!1})=>(0,i.useMemo)((()=>n?void 0!==e?e:BigInt(0):void 0!==t&&void 0!==e?t+e:e||t),[t,e,n]))({gasTotalPrice:e.fee.gas,isGasSponsored:R,transactionValue:e.value}),se=ie&&(e=>{let t=e;if((e=>null!=e&&"object"==typeof e&&"walk"in e&&"function"==typeof e.walk)(e)&&(t=e.walk()),u.v.debug("transaction error:",t),c.F6.isInstance(t))return;if(c.k5.isInstance(t))return j.INSUFFICIENT_FUNDS;if((e=>{const t=C(e),n=(e=>null==e?void 0:e.message)(e);return t===x&&Boolean(null==n?void 0:n.includes("insufficient funds for gas * price + value"))})(t))return j.INSUFFICIENT_FUNDS;const n=C(t);return void 0!==n&&j[n]?j[n]:(e=>"reason"in e&&void 0!==e.reason)(t)&&S[t.reason]?S[t.reason]:"Something went wrong."})(ie),{data:re,isLoading:ce}=(0,y.v)((()=>e.getBalance())),de=(0,i.useMemo)((()=>void 0!==oe&&void 0!==re&&re<oe),[re,oe]),ue=(0,i.useMemo)((()=>{if(void 0!==oe&&void 0!==re)return oe-re}),[oe,re]),_e=(0,i.useMemo)((()=>{if(se)return null;if(c.F6.isInstance(ie))return(0,a.jsx)(g.F,{icon:"error",variant:"error",copykey:"dyn_send_transaction.error_message.gas_not_sponsored",children:J("dyn_send_transaction.error_message.gas_not_sponsored")});if(!ne&&!ce&&void 0===ue&&e.fee.gas&&!R)return(0,a.jsxs)(g.F,{icon:"error",variant:"warning",contentDataTestId:"warning_content",copykey:"dyn_send_transaction.warning_message.insufficient_gas_funds",children:[(0,a.jsx)(h.o,{variant:"body_normal",color:"primary",copykey:"dyn_send_transaction.warning_message.insufficient_gas_funds.title",children:J("dyn_send_transaction.warning_message.insufficient_gas_funds.title")}),(0,a.jsx)(h.o,{variant:"body_normal",color:"secondary",copykey:"dyn_send_transaction.warning_message.insufficient_gas_funds.description",children:J("dyn_send_transaction.warning_message.insufficient_gas_funds.description",{amountLeft:e.format(e.fee.gas,{precision:6}),currencySymbol:null==H?void 0:H.symbol})})]});if(de&&ue){const t=e.format(ue,{precision:6});return(0,a.jsxs)(g.F,{icon:"error",variant:"error",contentDataTestId:"warning_content",copykey:"dyn_send_transaction.warning_message.insufficient_funds",children:[(0,a.jsx)(h.o,{variant:"body_normal",color:"primary",copykey:"dyn_send_transaction.warning_message.insufficient_funds.title",children:J("dyn_send_transaction.warning_message.insufficient_funds.title")}),(0,a.jsx)(h.o,{variant:"body_normal",color:"secondary",copykey:"dyn_send_transaction.warning_message.insufficient_funds.description",children:J("dyn_send_transaction.warning_message.insufficient_funds.description",{amountLeft:t,currencySymbol:null==H?void 0:H.symbol})})]})}return Q.status===I.FAILED?(0,a.jsxs)(g.F,{icon:"error",variant:"warning",contentDataTestId:"warning_content",copykey:"dyn_send_transaction.warning_message.failed_simulation",children:[(0,a.jsx)(h.o,{variant:"body_normal",color:"primary",copykey:"dyn_send_transaction.warning_message.failed_simulation.title",as:"div",children:J("dyn_send_transaction.warning_message.failed_simulation.title")}),(0,a.jsx)(h.o,{variant:"body_normal",color:"secondary",copykey:"dyn_send_transaction.warning_message.failed_simulation.description",as:"div",children:J("dyn_send_transaction.warning_message.failed_simulation.description")})]}):null}),[Q.status,se,ie,ne,ce,ue,e,R,de,J,null==H?void 0:H.symbol]);(0,i.useEffect)((()=>{var t,n;Q.status!==I.SUCCESS||$||0!==(null===(t=Q.result)||void 0===t?void 0:t.outAssets.length)||q||(null===(n=e.isGasSponsored)||void 0===n?void 0:n.call(e))||Z({result:Q.result,status:I.FAILED})}),[Q,q,e,$]);const me=(0,i.useMemo)((()=>{var t;return{alert:_e,copykey:P,currentToken:O,disableSendButton:ce,displayPoweredByDynamicFooter:L,error:se,hideModal:B,isGasSponsored:R,isGasSponsoredLoading:ne,isLoading:ae,isNativeToken:D,onClickBack:W,onClickClose:E,onClickSend:()=>le(),onSuccess:e=>null==n?void 0:n(e),recipient:X,sendBalanceTransaction:$,simulationResult:null!==(t=Q.result)&&void 0!==t?t:void 0,title:A,total:oe,transaction:e,transactionValue:G,walletConnector:T,walletKey:(null==K?void 0:K.key)||""}}),[oe,X,O,G,D,W,E,P,A,B,ae,le,n,L,ce,se,_e,T,e,R,ne,null==K?void 0:K.key,Q.result,$]);return Q.status===I.LOADING?null:(0,a.jsx)(f.j,Object.assign({},me))},F=e=>(BigInt(e.callGasLimit||0)+BigInt(e.verificationGasLimit||0)+BigInt(e.preVerificationGas||0))*BigInt(e.maxFeePerGas||0)},87803:(e,t,n)=>{n.d(t,{C:()=>j});var l=n(74848),a=(n(60445),n(100),n(58080),n(96540),n(12174),n(29109),n(83650),n(46759),n(69648),n(88393),n(80066),n(91398)),i=(n(41253),n(95821),n(3418),n(48702),n(10941),n(16219),n(54769),n(60337),n(4402),n(11011),n(40337),n(81285),n(45468),n(99157),n(7116),n(20433),n(83073),n(21029),n(47979),n(63055),n(28765),n(40961),n(20545),n(50574),n(451),n(30593),n(7085),n(87237),n(80607),n(6864),n(29147),n(72366),n(55537),n(65381),n(75705),n(27373),n(95081),n(83178)),o=(n(58169),n(53006),n(74566),n(85168),n(71092),n(79620),n(22923),n(23121),n(59553),n(17632)),s=n(44128),r=(n(78080),n(11012)),c=(n(79903),n(8916)),d=n(95540),u=(n(30261),n(44719),n(14624),n(53454),n(31448),n(95253),n(98592),n(18983),n(21858),n(71172),n(44432),n(26968),n(56950),n(43433),n(87583),n(96696),n(4623),n(44917),n(94734),n(26490),n(10647),n(96355)),_=(n(80622),n(31825),n(89809)),m=n(54469),v=n(61919),w=n(54063),y=n(42919),g=n(302),h=n(98953),p=n(98030),f=n(14451),b=n(45544);const k={alias:f.h,country:w.h,email:y.h,firstName:p.h,jobTitle:b.h,lastName:p.h,phoneNumber:g.h,tShirtSize:h.h,username:m.h},x=({fields:e,className:t})=>{const n=1===e.length?k[e[0]]:void 0;return n?(0,l.jsx)(n,{className:t}):(0,l.jsx)(v.h,{className:t})},j=({onClickClose:e,onSubmit:t,fields:n,submitText:m,subtitle:v,title:w})=>{({submitText:m,subtitle:v,title:w}=((e,t)=>{const{appName:n,user:l}=(0,_.J)(),a=n?`${n} `:"";if(e.submitText||(e.submitText="Update"),1!==t.length)return e.title||(e.title="Update your info"),e.subtitle||(e.subtitle=`Fill out your info for your ${a}account`),e;const[i]=t,o=(0,u.F)(i).toLowerCase(),s=(null==l?void 0:l[i])?"Update":"Enter";return e.title||(e.title=`${s} your ${o}`),e.subtitle||(e.subtitle=`Add your ${o} to your ${a}account`),e})({submitText:m,subtitle:v,title:w},n));const y=e&&(0,l.jsx)(r.K,{type:"button",onClick:e,"data-testid":"close-button",children:(0,l.jsx)(a.h,{})});return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(d.r,{alignContent:"bottom",trailing:y,children:(0,l.jsxs)("div",{className:"user-field-editor__header",children:[(0,l.jsx)("div",{className:"user-field-editor__header__icon",children:(0,l.jsx)(o.I,{color:"brand-primary",size:"large",children:(0,l.jsx)(x,{fields:n})})}),w&&(0,l.jsx)(s.o,{variant:"title",color:"primary",children:w})]})}),(0,l.jsxs)("div",{className:"user-field-editor__body",children:[v&&(0,l.jsx)(s.o,{className:"user-field-editor__body__subtitle",variant:"body_normal",color:"secondary",children:v}),(0,l.jsx)(c.H,{filterFields:n,onEditProfileSubmit:t,formClassName:"user-field-editor__body__form",fieldsContainerStyle:{padding:0},options:{buttonsAsFooter:!1,hideCancelButton:!0,submitButtonProps:{buttonPadding:"large",startSlot:void 0,typographyProps:{variant:"button_primary"}},submitText:m}})]}),(0,l.jsx)(i.r,{asFooter:!0})]})}},26261:(e,t,n)=>{n.d(t,{I:()=>I});var l=n(74848),a=n(96540),i=n(95081),o=n(60445),s=n(79044),r=n(46136),c=n(69170),d=n(33016),u=(n(83650),n(46759),n(69648),n(88393),n(80066),n(41253),n(95821),n(53968)),_=(n(3418),n(48702),n(15988)),m=(n(10941),n(16219),n(12174),n(29109),n(54769),n(60337)),v=(n(4402),n(11011),n(40337),n(81285),n(45468),n(99157),n(7116),n(20433),n(83073),n(21029),n(47979),n(63055)),w=(n(28765),n(40961),n(20545),n(50574),n(451),n(30593),n(7085),n(87237),n(80607),n(6864),n(29147),n(72366),n(55537),n(65381),n(75705),n(27373)),y=n(90054),g=(n(100),n(58080),n(53006),n(11012),n(71172),n(14624),n(44432),n(79903),n(53454),n(74566),n(85168),n(71092),n(26968),n(56950),n(43433),n(87583),n(30261),n(96696),n(3136)),h=n(37305),p=n(45272),f=n(26480),b=n(44128),k=(n(58169),n(79620),n(22923),n(23121),n(59553),n(17632));n(78080),n(44719),n(31448),n(95253),n(98592),n(18983),n(21858),n(4623),n(44917),n(94734),n(26490),n(10647),n(80622),n(31825);const x=({title:e,subtitle:t,image:n})=>{const{t:a}=(0,i.Bd)();return(0,l.jsxs)("div",{className:"search-instead__container",children:[n&&(0,l.jsx)(k.I,{className:"search-instead__container__image",color:"text-tertiary",children:n}),(0,l.jsx)(b.o,{color:"secondary",variant:"body_small",weight:"regular",copykey:"dyn_wallet_list.wallet_missing.title",children:e||a("dyn_wallet_list.wallet_missing.title")}),(0,l.jsx)(b.o,{color:"primary",variant:"button_primary",weight:"regular",copykey:"dyn_wallet_list.wallet_missing.description",children:t||a("dyn_wallet_list.wallet_missing.description")})]})},j=({items:e,onSelect:t,value:n})=>(0,l.jsx)("div",{className:"wallet-list-grid-tabs",children:e.map(((a,i)=>{const o=n===i,{icon:s,text:r}=a.label,c=`${r}-${s}-${e.indexOf(a)}`,d="string"==typeof s?(0,l.jsx)("img",{src:s,alt:r}):s;return(0,l.jsxs)("button",{type:"button",className:(0,y.x)("wallet-list-grid-tabs__button",{"wallet-list-grid-tabs__button--selected":o,"wallet-list-grid-tabs__button--text":Boolean(r)}),tabIndex:-1,"aria-label":r,onClick:()=>t(i),children:[d&&(0,l.jsx)(k.I,{size:"small",className:(0,y.x)({"wallet-list-grid-tabs__icon--selected":!o}),children:d}),r&&(0,l.jsx)(b.o,{as:"span",variant:"body_small",weight:o?"bold":"medium",color:o?"primary":"secondary",children:r})]},c)}))});var S=n(56800),C=n(89809);const I=({isWalletConnectList:e=!1,onSelectWallet:t,viewWalletsFilter:n})=>{var b,k;(0,_.S)((()=>()=>null===o.n$||void 0===o.n$?void 0:o.n$.setItem(u.Qt,"")));const{walletsFilter:I,walletConnectorOptions:N,projectSettings:F,defaultNumberOfWalletsToShow:W,bridgeChainsToConnect:T,authMode:E,multiWallet:A,recommendedWallets:L,selectedTabIndex:P,setSelectedTabIndex:B,selectedTabSettings:O,tabsItems:D}=(0,C.J)(),G=(0,v.zy)(),V=(0,w.HZ)(),{error:$}=(0,m.pu)(),{showDefaultFooter:K}=(0,f.h)(),[z,R]=(0,a.useState)(!0),{t:U}=(0,i.Bd)(),[M,J]=(0,a.useState)(null!==(b=o.n$.getItem(u.Qt))&&void 0!==b?b:""),H=(null==T?void 0:T.length)&&(0,h.Lo)(T[0].chain),q=H&&H(N),Q=((e,t)=>e&&(null==e?void 0:e.recommendedWallets)?e.recommendedWallets:t)(O,L),Z=((e,t)=>e&&(null==e?void 0:e.walletsFilter)?e.walletsFilter:t)(O,I),{numberOfWallets:X,walletsList:Y}=(0,p.N7)({authMode:E,groupWallets:!0,inputList:q||N,isWalletConnectList:e,lastUsedWalletKey:null!==(k=o.n$.getItem(u.$1))&&void 0!==k?k:void 0,multiWallet:A,numberOfWalletsToShow:W,recommendedWallets:Q,searchFilter:M,showMoreWalletsWithFilter:!0,userWallets:G,walletGroups:V,walletsFilter:n&&Z?(0,o.Fs)(n).pipe(Z):n||Z}),ee=Boolean(M)||X>W&&Y.length!==X,te=Boolean(null==D?void 0:D.length),ne=(0,a.useRef)(null),le=e=>{o.n$.setItem(u.Qt,e),J(e)},ae=F?ee&&(0,l.jsx)("div",{className:(0,y.x)("wallet-list__search-container",{"wallet-list__search-container--scroll":!$}),children:(0,l.jsx)(c.v,{copykey:"dyn_wallet_list.search.label",label:U("dyn_wallet_list.search.label",{numberOfWallets:X}),value:M,onChange:({target:{value:e}})=>le(e),onClickClear:()=>le("")})}):(0,l.jsx)(d.E,{className:"wallet-list__search-skeleton"});return(0,l.jsxs)(l.Fragment,{children:[te&&(0,l.jsx)("div",{className:"wallet-list__tabs-container",children:(0,l.jsx)(j,{items:D,value:P||0,onSelect:B})}),ae,Boolean($)&&(0,l.jsx)(r.O,{className:"wallet-list__error-container",withIcon:!1,children:$}),(0,l.jsx)("div",{className:"wallet-list__container",children:(0,l.jsxs)("div",{className:(0,y.x)("wallet-list__scroll-container",{"wallet-list__scroll-container--error":Boolean($),"wallet-list__scroll-container--fixed-height":te}),"data-testid":"wallet-list-scroll-container",ref:ne,onScroll:()=>{const e=ne.current;e&&((null==e?void 0:e.scrollTop)>1.25*(null==e?void 0:e.clientHeight)?R(!1):R(!0))},children:[F?(0,l.jsxs)(l.Fragment,{children:[0===N.length&&(0,l.jsx)(r.O,{copykey:"dyn_wallet_list.configuration_mismatch",children:U("dyn_wallet_list.configuration_mismatch")}),N.length&&0===Y.length?(0,l.jsx)(x,{title:U("dyn_wallet_list.search.not_found.title"),subtitle:U("dyn_wallet_list.search.not_found.description"),image:(0,l.jsx)(s.h,{})}):Y.map(((e,n)=>(0,l.jsx)(S.F,{wallet:e,onResetSearchValue:()=>le(""),recommendedWallets:Q,onSelectWallet:t},`${e.key}_${n}`)))]}):(0,l.jsx)(d.E,{count:10,className:"wallet-list__tile-skeleton"}),ee&&!M&&F&&(0,l.jsx)(x,{})]})}),K&&(0,l.jsx)(g.V,{hideBorder:!z})]})}},56800:(e,t,n)=>{n.d(t,{F:()=>f});var l=n(29109),a=n(74848),i=n(95821),o=n(80066),s=(n(60445),n(100),n(58080),n(96540),n(12174),n(83650),n(46759),n(69648),n(88393),n(87300)),r=n(41253),c=n(74043),d=(n(10941),n(16219),n(54769),n(60337),n(3418),n(48702),n(4402),n(11011),n(40337),n(41653)),u=(n(81285),n(45468),n(99157),n(7116),n(20433),n(83073),n(21029),n(47979),n(63055),n(28765),n(40961),n(20545),n(50574),n(451),n(30593),n(7085),n(87237),n(80607),n(6864),n(29147),n(72366),n(55537),n(65381),n(75705),n(27373)),_=(n(95081),n(44128)),m=(n(58169),n(53006),n(74566),n(85168),n(71092),n(79620),n(22923),n(7096)),v=n(23121),w=n(57372),y=(n(59553),n(17632)),g=n(34190),h=(n(78080),n(11012),n(79903),n(30261),n(96696),n(44719),n(14624),n(53454),n(31448),n(95253),n(98592),n(82544));n(18983),n(21858),n(4623),n(44917),n(94734),n(26490),n(10647),n(26968),n(80622),n(31825),n(71172),n(44432),n(56950),n(43433),n(87583);const p=({leading:e,name:t,onClick:n,trailing:l})=>(0,a.jsx)(g.F,{leading:e,trailing:l,onClick:n,className:"wallet-list-item__tile",dataTestId:"ListTile",children:t}),f=({disabled:e=!1,wallet:t,onResetSearchValue:n,recommendedWallets:g,tile:f=p,onSelectWallet:b})=>{var k,x,j,S,C;const{navigateToWalletGroup:I}=(0,v.Rz)(),{setView:N}=(0,r.At)(),F=(0,w.z)(t),W=(0,u.HZ)(),T=(0,c.t)({recommendedWallets:g,wallet:t}),E=f,A=F?null===(k=W[t.key])||void 0===k?void 0:k.name:t.walletConnector.metadata.name,L=null!==(j=null===(x=t.walletConnector)||void 0===x?void 0:x.metadata.icon)&&void 0!==j?j:null===(C=null===(S=W[t.key])||void 0===S?void 0:S.brand)||void 0===C?void 0:C.icon,P=(0,a.jsx)(i.lc,{className:"wallet-list-item__leading",icon:L,walletKey:t.key,style:{height:(0,d.a)(28),width:(0,d.a)(28)},isGroup:F}),B=(0,a.jsx)(m.K,{hoverElement:(0,a.jsx)(y.I,{color:"text-tertiary",size:"mini",children:(0,a.jsx)(s.h,{})}),children:T&&(0,a.jsx)(h.E,{dot:!T.isRecommended,variant:T.isRecommended?"primary":"secondary",text:(0,a.jsx)(_.o,{variant:"body_small",children:T.label})})});return(0,a.jsx)(E,{leading:P,trailing:B,name:A,onClick:()=>(0,l.s)(void 0,void 0,void 0,(function*(){if(!e){if(null==n||n(""),F)return I(t,{onSelectWallet:b});(0,o.fg)(t.walletConnector)&&t.walletConnector.canConnectWithHardwareWallet()?N("select-hardware-wallet",{onSelectWallet:b,wallet:t}):b(t)}}))})}},69649:(e,t,n)=>{n.d(t,{d:()=>r});var l=n(4402),a=n(80066),i=n(75705),o=(n(46759),n(69648),n(88393),n(96540),n(74848),n(41253),n(20333));n(60445),n(3418),n(48702),n(95821),n(10941),n(16219);const s={starknet:"STARK"},r=e=>{var t,n;return(0,l.a3)({enabledChains:(n=e.getSupportedWalletOpts.settings.chains,n.filter((({enabled:e})=>e)).map((({name:e})=>{var t,n;return null!==(t=s[e])&&void 0!==t?t:null===(n=(0,a.Qr)(e))||void 0===n?void 0:n.symbol})).filter((e=>Boolean(e)))),getSupportedWalletOpts:Object.assign(Object.assign({},e.getSupportedWalletOpts),{chainRpcProviders:i.fZ,walletConnectProjectId:null===(t=e.getSupportedWalletOpts.settings.sdk.walletConnect)||void 0===t?void 0:t.projectId})}).map((t=>{var n;return null===(n=e.walletConnectorExtensions)||void 0===n||n.forEach((n=>{var l;return t.extend(n,{walletConnectDappProjectId:null===(l=e.getSupportedWalletOpts.settings.sdk.walletConnect)||void 0===l?void 0:l.walletProjectId})})),(0,o.i)(e.getSupportedWalletOpts.walletBook,t)}))}},83261:(e,t,n)=>{n.d(t,{i:()=>a});var l=n(96540);const a=({settingsOverrides:e})=>{var t,n,a;const i=null===(t=null==e?void 0:e.views)||void 0===t?void 0:t.find((e=>"wallet-list"===e.type)),[o,s]=(0,l.useState)(0);return{selectedTabIndex:o,selectedTabSettings:null===o||null===(n=null==i?void 0:i.tabs)||void 0===n?void 0:n.items[o],setSelectedTabIndex:s,tabsItems:null===(a=null==i?void 0:i.tabs)||void 0===a?void 0:a.items}}},31564:(e,t,n)=>{n.d(t,{s:()=>Ke});var l=n(74848),a=n(42256),i=n(34100),o=n(90266),s=n(77168),r=n(31496),c=n(94232),d=n(32996),u=n(69296),_=n(94816),m=n(81789),v=n(97612),w=n(22267),y=n(58626),g=n(24906),h=n(18685),p=n(83502),f=n(33600),b=n(29760),k=n(84244),x=n(66925),j=n(26272),S=n(72824),C=n(98246),I=n(18078),N=n(90192),F=n(5744),W=n(31616),T=n(39156),E=n(17280),A=n(1866),L=n(7728),P=n(11880),B=n(71343),O=n(66322),D=n(99983),G=n(74041),V=n(84957),$=n(76297),K=n(72269),z=n(34307),R=n(24735),U=n(95081),M=n(60445),J=(n(100),n(58080),n(96540)),H=(n(12174),n(29109)),q=(n(83650),n(46759),n(69648)),Q=(n(88393),n(80066)),Z=n(41253),X=n(95821),Y=(n(3418),n(48702),n(10941),n(16219),n(54769),n(60337),n(4402),n(11011),n(40337),n(81285),n(45468),n(99157),n(7116),n(20433),n(83073),n(21029),n(47979),n(63055),n(28765),n(40961),n(20545),n(50574),n(451),n(30593),n(7085)),ee=(n(87237),n(80607),n(6864),n(29147),n(72366),n(55537),n(65381),n(75705),n(27373)),te=(n(58169),n(53006),n(74566),n(85168),n(71092),n(79620),n(22923),n(23121)),ne=(n(59553),n(78080),n(11012),n(79903),n(30261),n(96696),n(44719),n(14624),n(53454),n(31448),n(95253),n(98592),n(18983),n(21858),n(30130)),le=n(61320),ae=n(26261),ie=n(65274),oe=n(43774),se=n(3470),re=n(27661),ce=n(13181),de=n(35178),ue=n(75566),_e=n(49795),me=n(89809),ve=n(80426),we=n(44128),ye=n(36100);n(4623),n(44917),n(94734),n(26490),n(10647),n(26968),n(80622),n(31825),n(71172),n(44432),n(56950),n(43433),n(87583);var ge=n(50984),he=n(46856),pe=n(53320),fe=n(67394),be=n(74043),ke=n(87300),xe=n(17632),je=n(41653),Se=n(7096),Ce=n(34190),Ie=n(82544);const Ne=({wallet:e,onClick:t})=>{const[n]=e.walletConnector.supportedChains,a=(0,Q.nj)(n),i=(0,be.t)({wallet:e}),o=(0,l.jsx)(Se.K,{hoverElement:(0,l.jsx)(xe.I,{color:"text-tertiary",size:"mini",children:(0,l.jsx)(ke.h,{})}),children:i&&(0,l.jsx)(Ie.E,{dot:!i.isRecommended,variant:i.isRecommended?"primary":"secondary",text:(0,l.jsx)(we.o,{variant:"body_small",children:i.label})})}),s=(0,J.useMemo)((()=>{const e={height:(0,je.a)(28),width:(0,je.a)(28)},t=(0,fe.N)(n);return(0,l.jsx)(t,{style:e})}),[n]),r=(null==a?void 0:a.displayName)||e.name;return(0,l.jsx)(Ce.F,{className:"chain-card",onClick:t,leading:s,trailing:o,children:r},e.key)};var Fe=n(9778);const We=({isWalletConnectList:e})=>{const{handleWalletItemClick:t}=(0,Fe.f)();return(0,l.jsx)(ae.I,{onSelectWallet:t,isWalletConnectList:e})};var Te=n(51645),Ee=n(46136),Ae=n(21416),Le=n(90054),Pe=n(83178),Be=n(53968),Oe=n(71585),De=n(23536),Ge=n(80396),Ve=n(98144),$e=n(31747);const Ke={"access-blocked":a.G,"account-exists":i.J,"bridge-next-wallet-connection":o.L,"bridge-summary":s.b,"bridge-welcome":r.D,captcha:c.v,"chainalysis-blocked-wallet":B.e,"collect-user-data":u.b,"collect-user-data-login-no-wallet":_.p,"create-password-view":m.P,"deposit-view":Ve.a,"email-wallet-otp-verification-view":y.F,"embedded-delete-view":g.P,"embedded-reveal-account-view":h.v,"embedded-reveal-view":h.v,"embedded-wallet-auth-choice":R.q,"external-funding-wallet-list":ae.I,"farcaster-connect-view":p.H,"gate-blocked-wallet":B.e,"global-wallet-confirm":f.S,"global-wallet-info":b.Q,"global-wallet-malicious":k.K,"login-with-email-or-wallet":x.r,"login-with-email-or-wallet-full-wallet-list":We,"login-with-email-verification":w.S,"login-with-sms-verification":ce.V,"login-with-wallet-only":x.r,"merge-user-accounts":S.T,"merge-user-accounts-conflicts":j.q,"merge-user-accounts-with-same-email":C.h,"mfa-choose-device":I.Z,"mfa-display-backup-codes":N.Y,"mfa-recovery":F.j,"mfa-secure-device":T.r,"mfa-secure-device-help":W.c,"mfa-verification":E.F,"mobile-wallet-redirect-view":A.$,"multi-wallet-wallet-list":We,"network-not-supported":L.O,"network-not-supported-manual":P.W,"no-access":B.e,"no-qr-not-installed":O.F,"passkey-intro":D.K,"passkey-new-domain-detected":$e.a,"passkey-recovery-add-email":G.d,"passkey-recovery-bundle":V.Y,"passkey-recovery-complete":$.P,"passkey-recovery-start":K.w,"pending-connect":ie.z,"pending-signature":ne.j,"pending-signature-without-back-button":ne.j,"qr-code":le.q,"rename-passkey":z.A,"sandbox-maximum-threshold-reached":oe.T,"select-hardware-wallet":se.x,"select-wallet-in-wallet-group":re.W,"social-redirect-view":de.B,"social-wrong-account":ue.N,"verify-email":w.S,"verify-sms":ce.V,"wait-for-email-confirmation-view":v.M,"wallet-cannot-be-transferred":()=>{const{goToInitialView:e}=(0,Z.At)(),{selectedWalletConnector:t}=(0,me.J)(),{t:n}=(0,U.Bd)(),{data:a}=(0,ve.v)((()=>(0,H.s)(void 0,void 0,void 0,(function*(){const e=yield null==t?void 0:t.getConnectedAccounts();return(0,_e.F)(null==e?void 0:e[0])}))),{deps:[t]});return(0,l.jsxs)("div",{className:"wallet-cannot-be-transferred-view__container",children:[(0,l.jsx)(we.o,{className:"wallet-cannot-be-transferred-view__title",as:"h6",variant:"title",color:"primary",weight:"medium",copykey:"dyn_wallet_link.cannot_link.title",children:n("dyn_wallet_link.cannot_link.title")}),(0,l.jsx)("div",{className:"wallet-cannot-be-transferred-view__icon",children:(0,l.jsx)(X.lc,{icon:null==t?void 0:t.metadata.icon,walletKey:null==t?void 0:t.key,width:64,height:64})}),(0,l.jsx)(we.o,{className:"wallet-cannot-be-transferred-view__shorten-wallet-address",variant:"body_normal",weight:"regular",color:"primary",children:a}),(0,l.jsx)(we.o,{className:"wallet-cannot-be-transferred-view__copy",variant:"body_normal",color:"secondary",weight:"regular",copykey:"dyn_wallet_link.cannot_link.description",children:n("dyn_wallet_link.cannot_link.description")}),(0,l.jsx)(ye.E,{buttonClassName:"wallet-cannot-be-transferred-view__transfer-alt-wallet-button",buttonVariant:"primary",expanded:!0,buttonPadding:"large",onClick:e,dataTestId:"wallet-cannot-be-transferred-view-transfer-alt-wallet",copykey:"dyn_wallet_link.cannot_link.link_other_button",children:n("dyn_wallet_link.cannot_link.link_other_button")}),(0,l.jsx)(ye.E,{dataTestId:"wallet-cannot-be-transferred-view-cancel",buttonPadding:"small",buttonClassName:"wallet-cannot-be-transferred-view__cancel",onClick:e,copykey:"dyn_wallet_link.cannot_link.cancel_button",children:n("dyn_wallet_link.cannot_link.cancel_button")})]})},"wallet-claim-intro":d.F,"wallet-connect-mobile-wallets-list":()=>(0,l.jsx)(We,{isWalletConnectList:!0}),"wallet-group":({onSelectWallet:e})=>{var t;const{selectedWalletGroup:n}=(0,te.Rz)(),a=(0,ee.HZ)(),{t:i}=(0,U.Bd)();if(!n)throw new Error("Could not access WalletGroup view without selected group");const o=a[n.key];if(!o)throw new Error("Could not find group");const s=n.groupedWallets.map((({walletConnector:e})=>e)).filter((e=>(0,Q.fg)(e)&&e.canConnectWithHardwareWallet()));return(0,l.jsx)(pe.u,{icon:(0,l.jsx)(X.lc,{walletKey:o.key,isGroup:!0,icon:null===(t=o.brand)||void 0===t?void 0:t.icon}),title:i("dyn_select_chain.description"),titleCopyKey:"dyn_select_chain.description",children:(0,l.jsxs)("div",{className:"wallet-group__list",children:[Boolean(s.length)&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(he.w,{connectors:s,copykey:"dyn_select_chain.using_hardware_wallet_toggle_label",label:i("dyn_select_chain.using_hardware_wallet_toggle_label")}),(0,l.jsx)(ge.c,{})]}),(0,l.jsx)("div",{className:"wallet-group-view-layout__list",children:n.groupedWallets.map(((t,n)=>(0,l.jsx)(Ne,{wallet:t,onClick:()=>e(t)},`${t.key}_${n}`)))})]})})},"wallet-list":We,"wallet-locked-view":()=>{const{handleLogOut:e,primaryWallet:t,setShowAuthFlow:n,appName:a}=(0,me.J)(),{t:i}=(0,U.Bd)();if(!t)return null;const o=(0,l.jsx)(X.lc,{icon:t.connector.metadata.icon,walletKey:t.connector.key,style:{height:(0,je.a)(64*Te.X),width:(0,je.a)(64*Te.X)}});return(0,l.jsxs)("div",{"data-testid":"wallet-locked-view",children:[(0,l.jsx)(Ee.O,{withIcon:!1,variant:"success",className:"wallet-locked-view__error-container",copykey:"dyn_wallet_locked.connect_continue",children:i("dyn_wallet_locked.connect_continue")}),(0,l.jsxs)("div",{className:"wallet-locked-view__content",children:[(0,l.jsx)(Te.x,{Icon:o,iconSize:64,className:"wallet-locked-view__icon",isSpinning:!0}),(0,l.jsx)(we.o,{variant:"title",color:"primary",weight:"medium",className:"wallet-locked-view__title",copykey:"dyn_wallet_locked.title",children:i("dyn_wallet_locked.title")}),(0,l.jsxs)(we.o,{variant:"body_normal",color:"secondary",weight:"regular",copykey:"dyn_wallet_locked.subtitle",children:[i("dyn_wallet_locked.subtitle"),a,"."]}),(0,l.jsx)(ye.E,{onClick:()=>(0,H.s)(void 0,void 0,void 0,(function*(){try{yield t.connector.connect(),n(!1)}catch(e){q.v.info("could not connect wallet")}})),buttonClassName:"wallet-locked-view__button",copykey:"dyn_wallet_locked.connect",children:i("dyn_wallet_locked.connect")}),(0,l.jsx)(ge.c,{text:"Or"}),(0,l.jsx)(Ae.Q,{className:"wallet-locked-view__log-out",onClick:e,copykey:"dyn_wallet_locked.logout",children:i("dyn_wallet_locked.logout")})]})]})},"wallet-redirect-view":()=>{const{t:e}=(0,U.Bd)(),{selectedWalletConnector:t}=(0,me.J)();return(0,l.jsxs)("div",{className:(0,Le.x)("wallet-redirect-view__container"),children:[t&&(0,l.jsx)(Te.x,{iconSize:64,Icon:(0,l.jsx)(X.lc,{icon:t.metadata.icon,walletKey:t.key}),isSpinning:!0}),(0,l.jsx)(we.o,{weight:"medium",variant:"title",className:(0,Le.x)("wallet-redirect-view__title"),copykey:"dyn_wallet_redirect.loading",children:e("dyn_wallet_redirect.loading")}),(0,l.jsx)(Pe.r,{classNameRoot:"powered-by-dynamic"})]})},"wallet-sign":()=>{const{goToInitialView:e}=(0,Z.At)(),{t}=(0,U.Bd)(),{setMultiWalletWidgetState:n,setSelectedWalletConnectorKey:a,selectedWalletConnector:i}=(0,me.J)();if(!i)return null;const{key:o,metadata:s}=i,r=(0,l.jsx)(X.lc,{icon:s.icon,walletKey:o,style:{height:(0,je.a)(96*Te.X),width:(0,je.a)(96*Te.X)}});return(0,l.jsxs)("div",{className:"wallet-sign-spinner__container","data-testid":"wallet-sign-spinner-view",children:[(0,l.jsx)(Te.x,{Icon:r,iconSize:96,isSpinning:!0}),(0,l.jsx)(we.o,{variant:"body_normal",weight:"regular",className:(0,Le.x)("wallet-sign-spinner__copy"),copykey:"dyn_wallet_transfer.sign.spinner.confirm_transfer",children:t("dyn_wallet_transfer.sign.spinner.confirm_transfer")}),(0,l.jsx)(ye.E,{expanded:!0,buttonPadding:"large",buttonVariant:"primary",buttonClassName:"wallet-sign-spinner__button",onClick:()=>(0,H.s)(void 0,void 0,void 0,(function*(){e(),n("idle"),a(null),yield null==i?void 0:i.endSession()})),typographyProps:{variant:"button_primary",weight:"medium"},copykey:"dyn_wallet_transfer.sign.spinner.cancel",children:t("dyn_wallet_transfer.sign.spinner.cancel")})]})},"wallet-used":()=>{const[e,t]=(0,J.useState)(!1),{t:n}=(0,U.Bd)(),{loading:a,setLoading:i}=(0,Y.nk)(),{setView:o}=(0,Z.At)(),{setShowAuthFlow:s,appName:r,siweStatement:c,setMultiWalletWidgetState:d,connectWallet:u,selectedWalletConnector:_,isSingleWalletAccount:m,handleLogOut:v}=(0,me.J)(),{data:w}=(0,ve.v)((()=>(0,H.s)(void 0,void 0,void 0,(function*(){const e=yield null==_?void 0:_.getConnectedAccounts();return null==e?void 0:e[0]}))),{deps:[_]}),y=(0,_e.F)(w),g=(0,Ge.i)();return(0,l.jsxs)("div",{className:"wallet-used-view__container",children:[(0,l.jsx)("div",{className:"wallet-used-view__icon",children:(0,l.jsx)(X.lc,{icon:null==_?void 0:_.metadata.icon,walletKey:null==_?void 0:_.key,width:64,height:64})}),(0,l.jsx)(we.o,{className:"wallet-used-view__shorten-wallet-address",variant:"body_normal",weight:"medium",color:"primary",children:y}),(0,l.jsx)(we.o,{className:"wallet-used-view__copy",variant:"body_normal",color:"secondary",weight:"regular",copykey:"dyn_wallet_link.existent_account.warning",children:n("dyn_wallet_link.existent_account.warning")}),m&&(0,l.jsxs)("label",{htmlFor:"skipEmptyAccountCheck",className:"wallet-used-view__checkbox-label",children:[(0,l.jsx)(De.S,{id:"skipEmptyAccountCheck",className:"wallet-used-view__checkbox-container",defaultChecked:e,onChange:()=>t(!e),ariaLabel:"skip empty account check"}),(0,l.jsx)(we.o,{variant:"body_small",color:"secondary",copykey:"dyn_wallet_link.existent_account.acceptance",children:n("dyn_wallet_link.existent_account.acceptance")})]}),(0,l.jsx)(ye.E,{buttonClassName:"wallet-used-view__accept-button",buttonVariant:"primary",expanded:!0,buttonPadding:"large",onClick:()=>(0,H.s)(void 0,void 0,void 0,(function*(){if(!_)return;d("awaiting_signature",void 0,"transferring_wallet"),i(!0),o("wallet-sign");const t=(0,Oe.i)({appName:r,siweStatement:c});try{const n=yield u(_);if(!(null==n?void 0:n.address))return;"phantom"===_.key&&(0,M.Fr)()&&M.n$.setItem(Be.jF,{loseOriginalAccountOnTransfer:e,submittedAtTimestamp:(new Date).toString(),verificationType:"awaiting_transfer"}),yield g({overrideSiweStatement:t,publicWalletAddress:n.address,skipEmptyAccountCheck:e,walletConnector:_}),s(!1)}catch(e){q.v.error(e),s(!1,{emitCancelAuth:!0})}finally{i(!1),d("idle")}})),disabled:!e&&m||a,dataTestId:"wallet-used-view-transfer-wallet",copykey:"dyn_wallet_link.confirm_button",children:n("dyn_wallet_link.confirm_button")}),(0,l.jsx)(ye.E,{dataTestId:"wallet-used-view-log-out",buttonPadding:"small",buttonClassName:"wallet-used-view__logout",onClick:v,copykey:"dyn_wallet_link.log_out_button",children:n("dyn_wallet_link.log_out_button")})]})}}}}]);