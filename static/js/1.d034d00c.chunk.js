(this.webpackJsonprebuild=this.webpackJsonprebuild||[]).push([[1],{275:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return f}));var a=n(23),c=n(31),l=n(28),i=n(0),o=n(20),s=n(106),r=n(6),u=l.a.constants.Zero,b={coll:u,want:u,I:{coll:"",want:""},old:{coll:"",want:""}},d=function(t,e){return l.a.utils.formatUnits(t,e||18)},j=function(t,e){return l.a.utils.parseUnits(t||"0",e||18)};function f(){var t=Object(i.useContext)(o.d).state,e=(t.signer,t.controller,Object(i.useContext)(o.e)),n=e.liteState,l=(n.bond,n.want),f=n.coll,h=n.pool,O=n.data,x=e.classesChild,w=e.handleClick,m=Object(i.useReducer)((function(t,e){return Object(a.a)(Object(a.a)({},t),e)}),b),p=Object(c.a)(m,2),y=p[0],g=p[1],v=Object(i.useState)(!0),I=Object(c.a)(v,2),S=I[0],k=I[1],C=Object(i.useState)(""),_=Object(c.a)(C,2),q=_[0],P=_[1];return Object(i.useEffect)((function(){return y==b||g(b)}),[h]),Object(i.useEffect)((function(){var t=j(y.I.coll),e=j(y.I.want);e.eq(y.want)?t.eq(y.coll)||h.ct.get_dy(t).then((function(e){P(""),g({coll:t,want:e,I:Object(a.a)(Object(a.a)({},y.I),{},{want:d(e)})})})).catch((function(){P("Insufficient Liquidity"),g({coll:u,want:u})})):h.ct.get_dx(e).then((function(t){P(""),g({coll:t,want:e,I:Object(a.a)(Object(a.a)({},y.I),{},{coll:d(t)})})})).catch((function(){P("Insufficient Liquidity"),g({coll:u,want:u})}))}),[y.I]),Object(i.useMemo)((function(){return Object(r.jsxs)("div",{className:x.root,children:[Object(r.jsxs)("div",{className:x.amount,children:[S?Object(r.jsx)(s.a,{title:"want",State:{state:y,setState:g,token:l,max:O.balance.want,if_max:O.balance.want.gt("0")},style:{height:"50PX"}}):Object(r.jsx)(s.a,{title:"coll",State:{state:y,setState:g,token:f,max:O.balance.coll,if_max:O.balance.coll.gt("0")},style:{height:"50PX"}}),Object(r.jsx)("span",{className:x.icon_arrow,onClick:function(){k(!S),g(b)},children:"swap_horiz"}),S?Object(r.jsx)(s.a,{title:"coll",State:{state:y,setState:g,token:f,max:O.balance.coll,if_max:O.balance.coll.gt("0")},style:{height:"50PX"}}):Object(r.jsx)(s.a,{title:"want",State:{state:y,setState:g,token:l,max:O.balance.want,if_max:O.balance.want.gt("0")},style:{height:"50PX"}})]}),Object(r.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[Object(r.jsx)("div",{style:{fontFamily:"Helvetica",fontSize:"14px",color:"red"},children:q}),Object(r.jsx)(s.b,{apy:parseFloat(O.apy).toPrecision(3),info:"APY is the fixed-rate lending interest received by \n          lender. This is the total cost for the 2-year-duration\n          loan. When lender exits before the expiry date, the\n          interest earned for the remainder of the loan at that\n          moment will be deducted in COLLAR.\n          "})]}),Object(r.jsx)("div",{className:x.button,children:Object(r.jsx)("div",{children:O.allowance.want.gt("100000000000000000000000000000000")||!h.ct.signer?S?Object(r.jsx)(s.e,{name:"Lend",onClick:function(){return w("lend")(y.want).then((function(){return g({I:{coll:"",want:""}})}))},disabled:u.eq(y.coll)}):Object(r.jsx)(s.e,{name:"Exit",onClick:function(){return w("redeem")(y.coll).then((function(){return g({I:{coll:"",want:""}})}))},disabled:u.eq(y.want)}):Object(r.jsx)(s.e,{name:"Approve",onClick:function(){return w("approve")(l)}})})})]})}),[y,O,S,q])}}}]);