(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),l=(t(20),t(2)),u=function(e){var n=e.person,t=e.deletePerson;return r.a.createElement("div",null,n.name," ",n.number,r.a.createElement("button",{onClick:function(){t(n)}},"delete"))},i=function(e){var n=e.persons,t=e.searchTerm,a=e.deletePerson,o=t?n.filter(function(e){return e.name.toLowerCase().startsWith(t.toLowerCase())}):n;return r.a.createElement("div",null,o.map(function(e){return r.a.createElement(u,{key:e.name,person:e,deletePerson:a})}))},s=function(e){var n=e.newName,t=e.handleNameChange,a=e.newNumber,o=e.handleNumberChange,c=e.AddName;return r.a.createElement("form",{onSubmit:c},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:t}),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:o}))),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=function(e){var n=e.searchTerm,t=e.handleSearchTermChange;return r.a.createElement("div",null,r.a.createElement("input",{value:n,onChange:t}))},m=t(3),f=t.n(m),h="api/persons",p=function(){return f.a.get(h).then(function(e){return e.data})},g=function(e){return f.a.post(h,e).then(function(e){return e.data})},v=function(e,n){return f.a.put("".concat(h,"/").concat(e),n).then(function(e){return e.data})},b=function(e){return f.a.delete("".concat(h,"/").concat(e)).then(function(e){return e.data})},w=function(e){var n=e.message,t=e.isSuccess;return null===n?null:t?r.a.createElement("div",{className:"success"},n):r.a.createElement("div",{className:"error"},n)},E=function(){var e=Object(a.useState)([{name:"Arto Hellas",number:"123-456-789"}]),n=Object(l.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),u=Object(l.a)(c,2),m=u[0],f=u[1],h=Object(a.useState)(""),E=Object(l.a)(h,2),O=E[0],j=E[1],S=Object(a.useState)(""),C=Object(l.a)(S,2),N=C[0],k=C[1],y=Object(a.useState)(null),A=Object(l.a)(y,2),T=A[0],P=A[1],D=Object(a.useState)(!0),W=Object(l.a)(D,2),B=W[0],I=W[1],J=function(e,n){I(n),P(e),setTimeout(function(){P(null)},5e3)};Object(a.useEffect)(function(){p().then(function(e){o(e)}).catch(function(e){console.log("getAll persons failed ",e),e.response.data.error?J("failed to getAll, ".concat(e.response.data.error),!1):J("failed to getAll, ".concat(e),!1)})},[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(w,{message:T,isSuccess:B}),r.a.createElement(d,{searchTerm:N,handleSearchTermChange:function(e){return function(e){console.log(e.target.value),k(e.target.value)}(e)}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(s,{newName:m,newNumber:O,handleNameChange:function(e){return function(e){console.log(e.target.value),f(e.target.value)}(e)},handleNumberChange:function(e){return function(e){console.log(e.target.value),j(e.target.value)}(e)},AddName:function(e){return function(e){e.preventDefault();var n={name:m,number:O,date:(new Date).toISOString()},a=t.find(function(e){return e.name===m});a?window.confirm("".concat(m," is already added to phonebook, replace the old number with new one?"))&&v(a.id,n).then(function(e){o(t.map(function(n){return n.id!==a.id?n:e})),f(""),j(""),J("".concat(e.name," updated."),!0)}).catch(function(e){console.log("update person failed ",e),e.response.data.error?J("failed to update person, ".concat(e.response.data.error),!1):J("failed to update person, ".concat(e),!1)}):g(n).then(function(e){console.log("added person: ",e),o(t.concat(e)),f(""),j(""),J("".concat(e.name," added."),!0)}).catch(function(e){console.log("create person failed ",e),e.response.data.error?J("failed to create person, ".concat(e.response.data.error),!1):J("failed to create person, ".concat(e),!1)})}(e)}}),r.a.createElement(i,{searchTerm:N,persons:t,deletePerson:function(e){return n=e,void(window.confirm("Do you really want to delete ".concat(n.name,"?"))&&b(n.id).then(function(e){console.log(e),o(t.filter(function(e){return e.id!==n.id})),f(""),j(""),J("".concat(n.name," deleted."),!0)}).catch(function(e){console.log("create person failed ",e),e.response.data.error?J("failed to delete, ".concat(e.response.data.error),!1):J("failed to delete, ".concat(e),!1)}));var n}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[14,1,2]]]);
//# sourceMappingURL=main.bfb4fa93.chunk.js.map