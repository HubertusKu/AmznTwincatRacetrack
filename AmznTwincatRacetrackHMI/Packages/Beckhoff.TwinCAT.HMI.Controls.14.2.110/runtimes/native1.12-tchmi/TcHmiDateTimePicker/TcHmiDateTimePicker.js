"use strict";var TcHmi;!function(TcHmi){!function(Controls){!function(Beckhoff){class TcHmiDateTimePicker extends TcHmi.Controls.System.TcHmiControl{static#tchmiFQN="TcHmi.Controls.Beckhoff."+this.name;constructor(element,pcElement,attrs){super(element,pcElement,attrs),this.__mousedownHandler=this.__onMousedown(),this.__mousedownCalendarHandler=this.__onMousedownCalendar(),this.__mouseupHandler=this.__onMouseup(),this.__focusoutHandler=this.__onFocusOut(),this.__keypressHandler=this.__onKeyPress()}__elementTemplateRoot;__elementDTPTemplate;__elementCalendarTemplate;__elementTimeAndButtonTemplate;__elementButtonTemplate;__elementInvalidNotification;__value;__minValue;__maxValue;__directDisplay;__ignoreInvalidValues;__showConfirmationButtons;__isReadOnly;__mousedownHandler;__mousedownCalendarHandler;__mouseupHandler;__focusoutHandler;__keypressHandler;__destroyersToCallOnDetach=[];__destroyersToCallOnDestroy=[];__baseControls={spinboxes:{}};__localizationReader=void 0;defaultDate={year:0,month:0,day:0,hour:0,minute:0,second:0,millisecond:0};__internalDateObject={year:0,month:0,day:0,hour:0,minute:0,second:0,millisecond:0};__dateSelectionObject={year:0,month:0,day:0,hour:0,minute:0,second:0,millisecond:0};__internalMinDateObject=null;__internalMaxDateObject=null;__isPressedCalendar=!1;__intervalTimerCalendar=0;__utcOffset=0;__REGEX_ISO_8601=/^\d{4}-(?:0\d|1[0-2])-(?:[0-2]\d|3[01])[Tt\s](?:[01]\d|2[0-3]):[0-5]\d:(?:[0-5]\d|60)(?:.\d+)?(?:[Zz]|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/;__updateInvalidNotificationTimer=0;__previnit(){if(this.__elementTemplateRoot=this.__element[0].getElementsByClassName("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-template")[0],this.__elementInvalidNotification=document.createElement("div"),this.__elementInvalidNotification.classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-invalid-notification"),!this.__elementTemplateRoot)throw new Error("Invalid Template.html");this.__elementDTPTemplate=$('<div class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-template-overlay tchmi-box"></div>');let elementSelectedTemplate=$('<div class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-selected-area-template tchmi-box"></div>'),dateValueTextblock=TcHmi.ControlFactory.createEx("TcHmi.Controls.Beckhoff.TcHmiTextblock",this.__id+"_dateValue",{"data-tchmi-text-horizontal-alignment":"Center","data-tchmi-text-vertical-alignment":"Center","data-tchmi-text-font-size":15,"data-tchmi-text":TcHmi.Localization.formatDate(new Date(0))},this);if(void 0===dateValueTextblock)throw new Error("Needed Textblock could not be instantiated");dateValueTextblock.getElement()[0].classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-template-value","tchmi-date-time-picker-template-value"),this.__baseControls.dateValueTextblock=dateValueTextblock,elementSelectedTemplate.append(dateValueTextblock.getElement()[0]);let choiceArea=$('<div class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-choice-area-template"></div>');this.__elementCalendarTemplate=$('<div class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template tchmi-box"></div>'),this.__elementCalendarTemplate.append(this.createCalendar(1970,1,1)),this.__elementTimeAndButtonTemplate=$('<div class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-time-and-button-area-template"></div>');let timeTemplate=$('<div class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-time-area-template tchmi-box"></div>');timeTemplate.append(this.__createTime(0,0,0,0)),this.__elementTimeAndButtonTemplate.append(timeTemplate);let buttonParentTemplate=$('<div class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-button-area-template tchmi-box"></div>');this.__elementButtonTemplate=$('<div class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-button-template"></div>')[0];let okButton=TcHmi.ControlFactory.createEx("TcHmi.Controls.Beckhoff.TcHmiButton",this.__id+"_okButton",{"data-tchmi-text":"%l%Control::TcHmi.Controls.Beckhoff.TcHmiDateTimePicker::Button_Text_Ok%/l%"},this);if(void 0===okButton)throw new Error("Needed Button could not be instantiated");okButton.getElement()[0].classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-template-action-button","tchmi-date-time-picker-template-action-button"),okButton.getElement()[0].style.gridColumn="2",this.__elementButtonTemplate.append(okButton.getElement()[0]),this.__baseControls.okButton=okButton;let cancelButton=TcHmi.ControlFactory.createEx("TcHmi.Controls.Beckhoff.TcHmiButton",this.__id+"_cancelButton",{"data-tchmi-text":"%l%Control::TcHmi.Controls.Beckhoff.TcHmiDateTimePicker::Button_Text_Cancel%/l%"},this);if(void 0===cancelButton)throw new Error("Needed Button could not be instantiated");cancelButton.getElement()[0].classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-template-action-button","tchmi-date-time-picker-template-action-button"),cancelButton.getElement()[0].style.gridColumn="3",this.__elementButtonTemplate.append(cancelButton.getElement()[0]),this.__baseControls.cancelButton=cancelButton,buttonParentTemplate.append(this.__elementButtonTemplate),this.__elementTimeAndButtonTemplate.append(buttonParentTemplate),choiceArea.append(this.__elementCalendarTemplate),choiceArea.append(this.__elementTimeAndButtonTemplate),this.__elementDTPTemplate.append(elementSelectedTemplate),this.__elementDTPTemplate.append(choiceArea),this.__destroyersToCallOnDestroy.push(this.__localization.watch((data=>{if(data.error===TcHmi.Errors.NONE&&data.reader&&(this.__localizationReader=data.reader,this.__elementCalendarTemplate.empty().append(this.createCalendar(this.__dateSelectionObject.year,this.__dateSelectionObject.month,this.__dateSelectionObject.day)),this.__updateHeaderDate(!1),this.__elementInvalidNotification.isConnected)){const realUtcDate=this.__getUtcDate(this.__dateSelectionObject);if(this.__minValue&&this.__internalMinDateObject&&-1===this.__compareDates(realUtcDate,this.__minValue)){let localMinValue=TcHmi.Localization.formatDate(new Date(this.__minValue))||"";this.__elementInvalidNotification.title=tchmi_format_string(this.__localizationReader.get("Tooltip_LessThanMin_Text"),localMinValue)}if(this.__maxValue&&this.__internalMaxDateObject&&1===this.__compareDates(realUtcDate.toISOString(),this.__maxValue)){let localMaxValue=TcHmi.Localization.formatDate(new Date(this.__maxValue))||"";this.__elementInvalidNotification.title=tchmi_format_string(this.__localizationReader.get("Tooltip_GreaterThanMax_Text"),localMaxValue)}}}))),this.__destroyersToCallOnDestroy.push(TcHmi.EventProvider.register("onUserDataChanged",this.__updateUtcOffset)),this.__updateUtcOffset(),super.__previnit()}__init(){super.__init();const passiveEventOptions={passive:!0,capture:!1};this.__element[0].addEventListener("mousedown",this.__mousedownHandler,passiveEventOptions),this.__elementCalendarTemplate[0].addEventListener("mousedown",this.__mousedownCalendarHandler,passiveEventOptions),this.__element[0].addEventListener("focusout",this.__focusoutHandler,passiveEventOptions),this.__element[0].addEventListener("userinputfinished",this.__focusoutHandler,passiveEventOptions),this.__element[0].addEventListener("keypress",this.__keypressHandler,passiveEventOptions),this.__elementCalendarTemplate.empty().append(this.createCalendar(this.__dateSelectionObject.year,this.__dateSelectionObject.month,this.__dateSelectionObject.day))}__attach(){super.__attach(),this.__destroyersToCallOnDetach.push(TcHmi.EventProvider.register(this.__id+".onResized",this.__onResized)),this.__destroyersToCallOnDetach.push(TcHmi.EventProvider.register(this.__id+".onMoved",(()=>this.__updateInvalidNotification()))),this.__baseControls.okButton&&this.__destroyersToCallOnDetach.push(TcHmi.EventProvider.register(this.__baseControls.okButton.getId()+".onPressed",this.__onPressed())),this.__baseControls.cancelButton&&this.__destroyersToCallOnDetach.push(TcHmi.EventProvider.register(this.__baseControls.cancelButton.getId()+".onPressed",this.__onPressed())),this.__baseControls.spinboxes.hours&&this.__destroyersToCallOnDetach.push(TcHmi.EventProvider.register(this.__baseControls.spinboxes.hours.getId()+".onUserInteractionFinished",this.__generateUserInteractionFinishedHandler(this.__baseControls.spinboxes.hours,(value=>{this.__dateSelectionObject.hour=value})))),this.__baseControls.spinboxes.minutes&&this.__destroyersToCallOnDetach.push(TcHmi.EventProvider.register(this.__baseControls.spinboxes.minutes.getId()+".onUserInteractionFinished",this.__generateUserInteractionFinishedHandler(this.__baseControls.spinboxes.minutes,(value=>{this.__dateSelectionObject.minute=value})))),this.__baseControls.spinboxes.seconds&&this.__destroyersToCallOnDetach.push(TcHmi.EventProvider.register(this.__baseControls.spinboxes.seconds.getId()+".onUserInteractionFinished",this.__generateUserInteractionFinishedHandler(this.__baseControls.spinboxes.seconds,(value=>{this.__dateSelectionObject.second=value})))),this.__baseControls.spinboxes.milliseconds&&this.__destroyersToCallOnDetach.push(TcHmi.EventProvider.register(this.__baseControls.spinboxes.milliseconds.getId()+".onUserInteractionFinished",this.__generateUserInteractionFinishedHandler(this.__baseControls.spinboxes.milliseconds,(value=>{this.__dateSelectionObject.millisecond=value})))),this.__destroyersToCallOnDetach.push(TcHmi.EventProvider.register("onUserDataChanged",(_evt=>{this.__processValue()}))),this.__updateInvalidNotificationTimer=setInterval((()=>this.__updateInvalidNotification()),500)}__detach(){super.__detach(),this.__updateInvalidNotificationTimer&&(clearInterval(this.__updateInvalidNotificationTimer),this.__updateInvalidNotificationTimer=0),this.__elementInvalidNotification.isConnected&&TcHmi.TopMostLayer.remove(this,this.__elementInvalidNotification);for(const destroy of this.__destroyersToCallOnDetach)destroy();this.__destroyersToCallOnDetach=[]}destroy(){if(this.__keepAlive)return;this.__intervalTimerCalendar&&(clearInterval(this.__intervalTimerCalendar),this.__intervalTimerCalendar=0);const passiveEventOptions={passive:!0,capture:!1};this.__element[0].removeEventListener("mousedown",this.__mousedownHandler,passiveEventOptions),this.__elementCalendarTemplate[0].removeEventListener("mousedown",this.__mousedownCalendarHandler,passiveEventOptions),this.__element[0].removeEventListener("focusout",this.__focusoutHandler,passiveEventOptions),this.__element[0].removeEventListener("userinputfinished",this.__focusoutHandler,passiveEventOptions),this.__element[0].removeEventListener("keypress",this.__keypressHandler,passiveEventOptions);for(const destroy of this.__destroyersToCallOnDestroy)destroy();this.__destroyersToCallOnDestroy=[],super.destroy()}__onResized=()=>{this.__updateInvalidNotification()};__updateInvalidNotification(){if(!this.__isAttached)return;const realUtcDate=this.__getUtcDate(this.__dateSelectionObject);if(this.isValid(realUtcDate))this.__elementInvalidNotification.isConnected&&TcHmi.TopMostLayer.remove(this,this.__elementInvalidNotification),this.__baseControls.okButton?.setIsEnabled(!this.__isReadOnly);else{let boundingRect=this.__elementDTPTemplate[0].getBoundingClientRect(),top=(boundingRect.top||0)-15,left=(boundingRect.left||0)+(boundingRect.width||0)-15;if([document.elementsFromPoint(left,top+16),document.elementsFromPoint(left+14,top+29)].every((elementStack=>{const controlIndex=elementStack.indexOf(this.__elementDTPTemplate[0]);return-1!==controlIndex&&(0===controlIndex||!!elementStack[controlIndex-1].closest("#tchmi-system-topmostlayer-master"))}))){if(this.__elementInvalidNotification.style.left=left+"px",this.__elementInvalidNotification.style.top=top+"px",TcHmi.TopMostLayer.add(this,this.__elementInvalidNotification,{closeOnBackground:!1,dimBackground:!1,modal:!1,justAbove:{reference:this.__element[0],conflictResolution:TcHmi.TopMostLayer.ConflictResolution.Down}}),this.__baseControls.okButton?.setIsEnabled(!1),this.__localizationReader){if(this.__minValue&&this.__internalMinDateObject&&-1===this.__compareDates(realUtcDate,this.__minValue)){let localMinValue=TcHmi.Localization.formatDate(new Date(this.__minValue))||"";this.__elementInvalidNotification.title=tchmi_format_string(this.__localizationReader.get("Tooltip_LessThanMin_Text"),localMinValue)}if(this.__maxValue&&this.__internalMaxDateObject&&1===this.__compareDates(realUtcDate,this.__maxValue)){let localMaxValue=TcHmi.Localization.formatDate(new Date(this.__maxValue))||"";this.__elementInvalidNotification.title=tchmi_format_string(this.__localizationReader.get("Tooltip_GreaterThanMax_Text"),localMaxValue)}}}else this.__elementInvalidNotification.isConnected&&TcHmi.TopMostLayer.remove(this,this.__elementInvalidNotification),this.__baseControls.okButton?.setIsEnabled(!1)}}__updateUtcOffset=()=>{this.__utcOffset=TcHmi.Server.getCurrentUserConfig().timeZoneOffset??0};__getUtcDate(dateObject){const msInUtc=Date.UTC(dateObject.year,dateObject.month-1,dateObject.day,dateObject.hour,dateObject.minute,dateObject.second,dateObject.millisecond);return new Date(msInUtc-this.__utcOffset)}__compareDates(a,b){const aIsString="string"==typeof a,bIsString="string"==typeof b;if(!aIsString&&!bIsString)return a<b?-1:a>b?1:0;const aDate=aIsString?new Date(a):a,bDate=bIsString?new Date(b):b;if(aDate<bDate)return-1;if(aDate>bDate)return 1;{const aString=aIsString?a:a.toISOString(),bString=bIsString?b:b.toISOString(),aSubSeconds=parseInt(aString.split(".")[1]??"0",10),bSubSeconds=parseInt(bString.split(".")[1]??"0",10);return aSubSeconds<bSubSeconds?-1:aSubSeconds>bSubSeconds?1:0}}__onMousedown(){return event=>{0===event.button&&this.getIsEnabled()&&TcHmi.Access.checkAccess(this,"operate")&&this.openDateTimePicker()}}__onMousedownCalendar(){return event=>{if(0!==event.button)return;if(!this.getIsEnabled()||this.__isReadOnly)return;if(!TcHmi.Access.checkAccess(this,"operate"))return;let targetElement=$(event.target);if(!targetElement.hasClass("tchmi-disabled")){if(this.__isPressedCalendar=!0,targetElement.hasClass("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-month-prev")){let newMonth=this.__dateSelectionObject.month-1;if(0===newMonth){newMonth=12;let newYear=this.__dateSelectionObject.year-1;if(newYear<1970)return;this.__dateSelectionObject.year=newYear}this.__dateSelectionObject.month=newMonth,this.__elementCalendarTemplate.empty().append(this.createCalendar(this.__dateSelectionObject.year,this.__dateSelectionObject.month,this.__dateSelectionObject.day)),this.__updateHeaderDate(),document.addEventListener("mouseup",this.__mouseupHandler,{passive:!0,once:!0}),this.__intervalTimerCalendar=setInterval((()=>{if(this.__isPressedCalendar){let newMonth=this.__dateSelectionObject.month-1;if(0===newMonth){newMonth=12;let newYear=this.__dateSelectionObject.year-1;if(newYear<1970)return;this.__dateSelectionObject.year=newYear}this.__dateSelectionObject.month=newMonth,this.__elementCalendarTemplate.empty().append(this.createCalendar(this.__dateSelectionObject.year,this.__dateSelectionObject.month,this.__dateSelectionObject.day)),this.__updateHeaderDate()}}),400)}else if(targetElement.hasClass("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-month-next")){let newMonth=this.__dateSelectionObject.month+1;if(newMonth>12){newMonth=1;let newYear=this.__dateSelectionObject.year+1;if(newYear>9999)return;this.__dateSelectionObject.year=newYear}this.__dateSelectionObject.month=newMonth,this.__elementCalendarTemplate.empty().append(this.createCalendar(this.__dateSelectionObject.year,this.__dateSelectionObject.month,this.__dateSelectionObject.day)),this.__updateHeaderDate(),document.addEventListener("mouseup",this.__mouseupHandler,{passive:!0,once:!0}),this.__intervalTimerCalendar=setInterval((()=>{if(this.__isPressedCalendar){let newMonth=this.__dateSelectionObject.month+1;if(newMonth>12){newMonth=1;let newYear=this.__dateSelectionObject.year+1;if(newYear>9999)return;this.__dateSelectionObject.year=newYear}this.__dateSelectionObject.month=newMonth,this.__elementCalendarTemplate.empty().append(this.createCalendar(this.__dateSelectionObject.year,this.__dateSelectionObject.month,this.__dateSelectionObject.day)),this.__updateHeaderDate()}}),400)}else if(targetElement.hasClass("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-year-prev")){let newYear=this.__dateSelectionObject.year-1;newYear>=1970&&(this.__dateSelectionObject.year=newYear,this.__elementCalendarTemplate.empty().append(this.createCalendar(this.__dateSelectionObject.year,this.__dateSelectionObject.month,this.__dateSelectionObject.day)),this.__updateHeaderDate(),document.addEventListener("mouseup",this.__mouseupHandler,{passive:!0,once:!0}),this.__intervalTimerCalendar=setInterval((()=>{if(this.__isPressedCalendar){let newYear=this.__dateSelectionObject.year-1;newYear>=1970&&(this.__dateSelectionObject.year=newYear,this.__elementCalendarTemplate.empty().append(this.createCalendar(this.__dateSelectionObject.year,this.__dateSelectionObject.month,this.__dateSelectionObject.day)),this.__updateHeaderDate())}}),400))}else if(targetElement.hasClass("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-year-next")){let newYear=this.__dateSelectionObject.year+1;newYear<=9999&&(this.__dateSelectionObject.year=newYear,this.__elementCalendarTemplate.empty().append(this.createCalendar(this.__dateSelectionObject.year,this.__dateSelectionObject.month,this.__dateSelectionObject.day)),this.__updateHeaderDate(),document.addEventListener("mouseup",this.__mouseupHandler,{passive:!0,once:!0}),this.__intervalTimerCalendar=setInterval((()=>{if(this.__isPressedCalendar){let newYear=this.__dateSelectionObject.year+1;newYear<=9999&&(this.__dateSelectionObject.year=newYear,this.__elementCalendarTemplate.empty().append(this.createCalendar(this.__dateSelectionObject.year,this.__dateSelectionObject.month,this.__dateSelectionObject.day)),this.__updateHeaderDate())}}),400))}else if(targetElement.hasClass("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-day-element")){targetElement.parent().children().removeClass("active"),targetElement.addClass("active");let newDay=targetElement[0].textContent;null!==newDay&&(this.__dateSelectionObject.day=parseInt(newDay,10),this.__updateHeaderDate())}this.__checkDateSelection(!this.__showConfirmationButtons)}}}__updateHeaderDate(process=!0){if(!this.__baseControls.dateValueTextblock)return;const realUtcDate=this.__getUtcDate(this.__dateSelectionObject);if(this.__localizationReader){const dateString=TcHmi.Localization.formatDate(realUtcDate),userTimeZone=TcHmi.Server.getCurrentUserConfig().timeZone,timeZoneOffsetMinutes=TcHmi.Server.getCurrentUserConfig().timeZoneOffset/1e3/60,formatTimezone=this.__localizationReader.get("Date_Format_Timezone"),formatBrowserTimezone=this.__localizationReader.get("Date_Format_Browser_Timezone"),utcOffsetString="UTC "+Math.trunc(timeZoneOffsetMinutes/60).toLocaleString("en-us",{minimumIntegerDigits:2,signDisplay:"always"})+":"+(timeZoneOffsetMinutes%60).toLocaleString("en-us",{minimumIntegerDigits:2,signDisplay:"never"});let dateAndTimezone;dateAndTimezone=userTimeZone?tchmi_format_string(formatTimezone,dateString,utcOffsetString,userTimeZone):tchmi_format_string(formatBrowserTimezone,dateString,utcOffsetString),this.__baseControls.dateValueTextblock.setText(dateAndTimezone)}this.__directDisplay&&!this.__showConfirmationButtons&&process&&this.isValid(realUtcDate)&&this.__setValue(realUtcDate.toISOString(),!1)}__onMouseup(){return evt=>{0===evt.button&&(this.__isPressedCalendar=!1,this.__intervalTimerCalendar&&(clearInterval(this.__intervalTimerCalendar),this.__intervalTimerCalendar=0))}}__onPressed(){return evt=>{if(evt.name.includes("ok")){this.__checkDateSelection();let realUtcDate=this.__getUtcDate(this.__internalDateObject).toISOString();this.__setValue(realUtcDate,!1),TcHmi.EventProvider.raise(this.__id+".onConfirmed"),TcHmi.EventProvider.raise(this.__id+".onUserInteractionFinished"),TcHmi.TopMostLayer.remove(this,this.__elementDTPTemplate)}else evt.name.includes("cancel")&&this.closeDateTimePicker()}}__generateUserInteractionFinishedHandler(spinbox,action){return evt=>{let value=spinbox.getValue();null!=value&&"bigint"!=typeof value&&(action(value),this.__checkDateSelection(!this.__showConfirmationButtons),this.__updateHeaderDate())}}__onFocusOut(){return event=>{this.__directDisplay&&!this.__showConfirmationButtons&&setTimeout((()=>{let focusedElement=document.activeElement;for(;focusedElement&&focusedElement!==this.__elementDTPTemplate[0];)focusedElement=focusedElement.parentElement;null===focusedElement&&TcHmi.EventProvider.raise(this.__id+".onUserInteractionFinished")}),0)}}__onKeyPress(){return event=>{this.__directDisplay&&!this.__showConfirmationButtons&&13===event.keyCode&&document.activeElement?.blur()}}openDateTimePicker(){if(null===this.__elementDTPTemplate[0].parentElement&&!this.__directDisplay){if(!this.getIsAttached())return void TcHmi.Log.errorEx(`[Source=Control, Module=${this.__type+(TcHmiDateTimePicker.#tchmiFQN!==this.__type?", Origin="+TcHmiDateTimePicker.#tchmiFQN:"")}, Id=${this.getId()}] Could not open picker overlay. The control needs to be attached to the dom.`);TcHmi.TopMostLayer.add(this,this.__elementDTPTemplate,{centerHorizontal:!0,centerVertical:!0,removeCb:data=>{data.canceled&&(TcHmi.EventProvider.raise(this.__id+".onCancel"),TcHmi.EventProvider.raise(this.__id+".onUserInteractionFinished"),this.__processValue())},resizeCb:data=>{this.__elementDTPTemplate.find(".TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-time-area-template").css({"margin-top":"0px"}),this.__elementDTPTemplate.find(".TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template").css({width:"350px"}),this.__elementDTPTemplate.find(".TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-time-and-button-area-template").css({width:""}),this.__elementDTPTemplate.find(".TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-time-and-button-area-template")[0].offsetTop>0&&(this.__elementDTPTemplate.find(".TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-time-area-template").css({"margin-top":"10px"}),this.__elementDTPTemplate.find(".TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-button-area-template").css({top:"10px","margin-bottom":"10px"}),this.__elementDTPTemplate.find(".TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template").css({width:"100%"}),this.__elementDTPTemplate.find(".TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-time-and-button-area-template").css({width:"100%"}))}})}}closeDateTimePicker(){this.__elementDTPTemplate[0].classList.contains("tchmi-in-topmostlayer")&&TcHmi.TopMostLayer.remove(this,this.__elementDTPTemplate),TcHmi.EventProvider.raise(this.__id+".onCancel"),TcHmi.EventProvider.raise(this.__id+".onUserInteractionFinished"),this.__processValue()}createCalendar(year,month,day){let docFragment=document.createDocumentFragment();if(!this.__attributesInitialized)return docFragment;let elementCalendarTemplate=document.createElement("div");elementCalendarTemplate.classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-calendar","tchmi-date-time-picker-calendar-template-calendar");let headerTemplate=document.createElement("div");headerTemplate.classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-header","tchmi-date-time-picker-calendar-template-header"),headerTemplate.innerHTML='<ul class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-header-month"><li class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-prev TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-month-prev">&lt; </li><li class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-actuallMonth"> '+new Date(year,month-1,day).toLocaleString(TcHmi.Locale.get(),{month:"long"})+' </li><li class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-next TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-month-next">&gt; </li></ul><ul class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-header-year"><li class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-prev TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-year-prev" >&lt; </li><li class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-actuallMonth"> '+year+' </li><li class="TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-next TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-year-next">&gt; </li></ul>',elementCalendarTemplate.appendChild(headerTemplate);let weekdaysTemplate=document.createElement("ul");weekdaysTemplate.classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-weekdays","tchmi-date-time-picker-calendar-template-weekdays");let dayDates=[new Date(2021,0,4),new Date(2021,0,5),new Date(2021,0,6),new Date(2021,0,7),new Date(2021,0,8),new Date(2021,0,9),new Date(2021,0,10)];for(let i=0,ii=dayDates.length;i<ii;i++){let dayDate=dayDates[i],element=document.createElement("li");element.textContent=dayDate.toLocaleString(TcHmi.Locale.get(),{weekday:"short"}),weekdaysTemplate.appendChild(element)}elementCalendarTemplate.appendChild(weekdaysTemplate);let daysInMonth=new Date(year,month,0).getDate(),firstDayInMonth=new Date(year,month-1,1).getDay();firstDayInMonth=0===firstDayInMonth?7:firstDayInMonth;let daysTemplate=document.createElement("ul");daysTemplate.classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-days","tchmi-date-time-picker-calendar-template-days");const minDateString=this.__internalMinDateObject?new Date(this.__internalMinDateObject.year,this.__internalMinDateObject.month-1,this.__internalMinDateObject.day).toISOString():void 0,maxDateString=this.__internalMaxDateObject?new Date(this.__internalMaxDateObject.year,this.__internalMaxDateObject.month-1,this.__internalMaxDateObject.day).toISOString():void 0;for(let i=-(firstDayInMonth-1),ii=daysInMonth;i<ii;i++){let elementDay=document.createElement("li");if(i>=0){elementDay.textContent=(i+1).toString(),elementDay.classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-day-element","tchmi-date-time-picker-calendar-template-day-element");let date=new Date(year,month-1,i+1);(minDateString&&this.__compareDates(date,minDateString)<0||maxDateString&&this.__compareDates(date,maxDateString)>0)&&elementDay.classList.add("tchmi-disabled")}i+1===day&&elementDay.classList.add("active"),daysTemplate.appendChild(elementDay)}let test=firstDayInMonth-1+daysInMonth;for(;!isNaN(test)&&test%7!=0;){let elementDay=document.createElement("li");daysTemplate.appendChild(elementDay),test++}return elementCalendarTemplate.appendChild(daysTemplate),docFragment.appendChild(elementCalendarTemplate),docFragment}__createSpinbox(name,value,zeroPadding,maxValue){let spinbox;if(void 0===TcHmi.Controls.get(this.getId()+"_"+name)&&(spinbox=TcHmi.ControlFactory.createEx("TcHmi.Controls.Beckhoff.TcHmiSpinboxInput",this.getId()+"_"+name,{"data-tchmi-value":value,"data-tchmi-value-horizontal-alignment":"Center","data-tchmi-auto-focus-out":!0,"data-tchmi-zero-padding":zeroPadding,"data-tchmi-button-position":"PlusTopAndMinusBottom","data-tchmi-min-value":0,"data-tchmi-max-value":maxValue,"data-tchmi-auto-step":!0},this)),!spinbox)throw new Error("Needed Spinbox could not be instantiated");return spinbox}__createDivider(character){let element=document.createElement("div");return element.classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-time-template-colon","tchmi-date-time-picker-time-template-colon"),element.textContent=character,element}__createTime(hours,minutes,seconds,milliseconds){let docFragment=document.createDocumentFragment(),template=document.createElement("div");template.classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-time-template","tchmi-date-time-picker-time-template");let timeTextblock=TcHmi.ControlFactory.createEx("TcHmi.Controls.Beckhoff.TcHmiTextblock",this.__id+"_timeLabel",{"data-tchmi-text-horizontal-alignment":"Center","data-tchmi-text-vertical-alignment":"Center","data-tchmi-text-font-size":15,"data-tchmi-text":"%l%Control::TcHmi.Controls.Beckhoff.TcHmiDateTimePicker::Label_Text_Time%/l%"},this);if(void 0===timeTextblock)throw new Error("Needed Textblock could not be instantiated");timeTextblock.getElement()[0].classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-template-time-label","tchmi-date-time-picker-template-time-label"),template.appendChild(timeTextblock.getElement()[0]);let hoursTemplate=document.createElement("div");hoursTemplate.classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-time-template-hour","tchmi-date-time-picker-time-template-hour");let hoursSpinbox=this.__createSpinbox("HoursSpinbox",hours,2,23);hoursSpinbox&&(hoursTemplate.appendChild(hoursSpinbox.getElement()[0]),this.__baseControls.spinboxes.hours=hoursSpinbox),template.appendChild(hoursTemplate),template.appendChild(this.__createDivider(":"));let minutesTemplate=document.createElement("div");minutesTemplate.classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-time-template-minute","tchmi-date-time-picker-time-template-minute");let minutesSpinbox=this.__createSpinbox("MinutesSpinbox",minutes,2,59);minutesSpinbox&&(minutesTemplate.appendChild(minutesSpinbox.getElement()[0]),this.__baseControls.spinboxes.minutes=minutesSpinbox),template.appendChild(minutesTemplate),template.appendChild(this.__createDivider(":"));let secondsTemplate=document.createElement("div");secondsTemplate.classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-time-template-second"),secondsTemplate.classList.add("tchmi-date-time-picker-time-template-second");let secondsSpinbox=this.__createSpinbox("SecondsSpinbox",seconds,2,59);secondsSpinbox&&(secondsTemplate.appendChild(secondsSpinbox.getElement()[0]),this.__baseControls.spinboxes.seconds=secondsSpinbox),template.appendChild(secondsTemplate),template.appendChild(this.__createDivider("."));let millisecondsTemplate=document.createElement("div");millisecondsTemplate.classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-time-template-millisecond","tchmi-date-time-picker-time-template-millisecond");let millisecondsSpinbox=this.__createSpinbox("MillisecondsSpinbox",milliseconds,3,999);return millisecondsSpinbox&&(millisecondsTemplate.appendChild(millisecondsSpinbox.getElement()[0]),this.__baseControls.spinboxes.milliseconds=millisecondsSpinbox),template.appendChild(millisecondsTemplate),docFragment.appendChild(template),docFragment}__setInternalValue(value){let newValue;if(value?(newValue=new Date(value),Number.isNaN(newValue.getTime())&&(newValue=new Date)):newValue=new Date,this.__minValue){let min=new Date(this.__minValue);if(Number.isNaN(min.getTime()))this.__internalMinDateObject=null;else if(this.__internalMinDateObject=TcHmi.Localization.parseDate(new Date(this.__minValue)),-1===this.__compareDates(this.__getUtcDate(this.__internalDateObject),this.__minValue)){this.__internalDateObject=this.__internalMinDateObject,this.__checkDateSelection();let realUtcDate=this.__getUtcDate(this.__internalDateObject).toISOString();this.__setValue(realUtcDate,!1)}}else this.__internalMinDateObject=null;if(this.__maxValue){let max=new Date(this.__maxValue);if(Number.isNaN(max.getTime()))this.__internalMaxDateObject=null;else if(this.__internalMaxDateObject=TcHmi.Localization.parseDate(new Date(this.__maxValue)),1===this.__compareDates(this.__getUtcDate(this.__internalDateObject),this.__maxValue)){this.__internalDateObject=this.__internalMaxDateObject,this.__checkDateSelection();let realUtcDate=this.__getUtcDate(this.__internalDateObject).toISOString();this.__setValue(realUtcDate,!1)}}else this.__internalMaxDateObject=null;this.__dateSelectionObject=TcHmi.Localization.parseDate(newValue),this.__updateHeaderDate(!1),this.__baseControls.spinboxes.hours?.setValue(this.__dateSelectionObject.hour),this.__baseControls.spinboxes.minutes?.setValue(this.__dateSelectionObject.minute),this.__baseControls.spinboxes.seconds?.setValue(this.__dateSelectionObject.second),this.__baseControls.spinboxes.milliseconds?.setValue(this.__dateSelectionObject.millisecond),this.__elementCalendarTemplate.children().hasClass("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-calendar-template-calendar")&&this.__elementCalendarTemplate.empty().append(this.createCalendar(this.__dateSelectionObject.year,this.__dateSelectionObject.month,this.__dateSelectionObject.day)),this.__checkDateSelection()}__checkDateSelection(update=!0){if(update&&!tchmi_equal(this.__internalDateObject,this.__dateSelectionObject)){const realUtcDate=this.__getUtcDate(this.__dateSelectionObject);this.isValid(realUtcDate)&&(this.__internalDateObject=tchmi_clone_object(this.__dateSelectionObject))}this.__updateInvalidNotification()}isValid(value){return!("string"==typeof value&&!this.__REGEX_ISO_8601.test(value))&&(!(this.__minValue&&this.__internalMinDateObject&&this.__compareDates(value,this.__minValue)<0)&&!(this.__maxValue&&this.__internalMaxDateObject&&this.__compareDates(value,this.__maxValue)>0))}setValue(valueNew){let convertedValue=TcHmi.ValueConverter.toString(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("Value")),this.__setValue(convertedValue)}__setValue(valueNew,process=!0){let convertedValue=TcHmi.ValueConverter.toString(valueNew);if(null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("Value")),convertedValue===this.__value)return;let isValid=this.isValid(valueNew??new Date);this.__ignoreInvalidValues&&!isValid||(this.__value=convertedValue,process&&this.__processValue(),TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Value"}),TcHmi.EventProvider.raise(this.__id+".onValueChanged"))}getValue(){if(void 0===this.__value)return;if(this.__value)return this.__value;return this.__getUtcDate(this.__internalDateObject).toISOString()}__processValue(){void 0!==this.__minValue&&void 0!==this.__maxValue&&void 0!==this.__value&&this.__setInternalValue(this.__value)}setMinValue(valueNew){let convertedValue=TcHmi.ValueConverter.toString(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("MinValue")),convertedValue!==this.__minValue&&(this.__minValue=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"MinValue"}),this.__processMinValue())}getMinValue(){return this.__minValue}__processMinValue(){void 0!==this.__minValue&&void 0!==this.__maxValue&&void 0!==this.__value&&(tchmi_equal(this.defaultDate,this.__dateSelectionObject)?this.__setInternalValue(void 0):this.__setInternalValue(this.__getUtcDate(this.__dateSelectionObject).toISOString()))}setMaxValue(valueNew){let convertedValue=TcHmi.ValueConverter.toString(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("MaxValue")),convertedValue!==this.__maxValue&&(this.__maxValue=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"MaxValue"}),this.__processMaxValue())}getMaxValue(){return this.__minValue}__processMaxValue(){void 0!==this.__minValue&&void 0!==this.__maxValue&&void 0!==this.__value&&(tchmi_equal(this.defaultDate,this.__dateSelectionObject)?this.__setInternalValue(void 0):this.__setInternalValue(this.__getUtcDate(this.__dateSelectionObject).toISOString()))}setIgnoreInvalidValues(valueNew){let convertedValue=TcHmi.ValueConverter.toBoolean(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("IgnoreInvalidValues")),convertedValue!==this.__ignoreInvalidValues&&(this.__ignoreInvalidValues=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"IgnoreInvalidValues"}),this.__processIgnoreInvalidValues())}getIgnoreInvalidValues(){return this.__ignoreInvalidValues}__processIgnoreInvalidValues(){void 0!==this.__minValue&&void 0!==this.__maxValue&&void 0!==this.__value&&(tchmi_equal(this.defaultDate,this.__dateSelectionObject)?this.__setInternalValue(void 0):this.__setInternalValue(this.__getUtcDate(this.__dateSelectionObject).toISOString()))}setDirectDisplay(valueNew){let convertedValue=TcHmi.ValueConverter.toBoolean(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("DirectDisplay")),convertedValue!==this.__directDisplay&&(this.__directDisplay=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"DirectDisplay"}),this.__processDirectDisplay())}getDirectDisplay(){return this.__directDisplay}__processDirectDisplay(){this.__directDisplay?(this.__elementDTPTemplate[0].classList.contains("tchmi-in-topmostlayer")&&(TcHmi.TopMostLayer.remove(this,this.__elementDTPTemplate),TcHmi.EventProvider.raise(this.__id+".onCancel"),TcHmi.EventProvider.raise(this.__id+".onUserInteractionFinished")),null===this.__elementDTPTemplate[0].parentElement&&this.__elementTemplateRoot.append(this.__elementDTPTemplate[0]),this.__element[0].classList.add("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-direct-display"),this.__element[0].setAttribute("tabindex","0")):(this.__elementDTPTemplate[0].parentElement===this.__elementTemplateRoot&&this.__elementTemplateRoot.removeChild(this.__elementDTPTemplate[0]),this.__element[0].classList.remove("TcHmi_Controls_Beckhoff_TcHmiDateTimePicker-direct-display"),this.__element[0].removeAttribute("tabindex")),this.__processShowConfirmationButtons()}setShowConfirmationButtons(valueNew){let convertedValue=TcHmi.ValueConverter.toBoolean(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("ShowConfirmationButtons")),convertedValue!==this.__showConfirmationButtons&&(this.__showConfirmationButtons=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"ShowConfirmationButtons"}),this.__processShowConfirmationButtons())}getShowConfirmationButtons(){return this.__showConfirmationButtons}__processShowConfirmationButtons(){!1===this.__showConfirmationButtons&&this.__directDisplay?(this.__elementButtonTemplate.style.display="none",this.__elementTimeAndButtonTemplate[0].style.gridTemplateRows="150px auto"):(this.__elementButtonTemplate.style.display="",this.__elementTimeAndButtonTemplate[0].style.gridTemplateRows="")}__processIsEnabled(){super.__processIsEnabled(),this.getIsEnabled()||this.__elementDTPTemplate[0].classList.contains("tchmi-in-topmostlayer")&&(TcHmi.TopMostLayer.remove(this,this.__elementDTPTemplate),TcHmi.EventProvider.raise(this.__id+".onCancel"),TcHmi.EventProvider.raise(this.__id+".onUserInteractionFinished"))}
/**
                 * Sets the isReadOnly attribute and calls the associated process function (processIsReadOnly).
                 * @preserve (Part of the public API)
                 */setIsReadOnly(valueNew){let convertedValue=TcHmi.ValueConverter.toBoolean(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("IsReadOnly")),convertedValue!==this.__isReadOnly&&(this.__isReadOnly=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"IsReadOnly"}),this.__processIsReadOnly())}getIsReadOnly(){return this.__isReadOnly}__processIsReadOnly(){this.__element[0].classList.toggle("read-only",this.__isReadOnly??!1);const realUtcDate=this.__getUtcDate(this.__dateSelectionObject);this.isValid(realUtcDate)&&this.__baseControls.okButton?.setIsEnabled(!this.__isReadOnly);for(const spinbox of Object.values(this.__baseControls.spinboxes))spinbox.setIsReadOnly(this.__isReadOnly??!1)}}Beckhoff.TcHmiDateTimePicker=TcHmiDateTimePicker}(Controls.Beckhoff||(Controls.Beckhoff={}))}(TcHmi.Controls||(TcHmi.Controls={}))}(TcHmi||(TcHmi={})),TcHmi.Controls.registerEx("TcHmiDateTimePicker","TcHmi.Controls.Beckhoff",TcHmi.Controls.Beckhoff.TcHmiDateTimePicker);