/**
 * Copyright 2014 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Namespace for String Demo.
 */
rtpg.string = rtpg.string || {};

rtpg.allDemos.push(rtpg.string);

/**
 * Realtime model's field name for String Demo.
 */
rtpg.string.FIELD_NAME = 'demo_string';

/**
 * Realtime model's field for String Demo.
 */
rtpg.string.field = null;

/**
 * Starting value of field for String Demo.
 */
rtpg.string.START_VALUE = 'Edit Me!';

/**
 * DOM id for the input element for String Demo.
 */
rtpg.string.INPUT_SELECTOR = 'demoStringInput';

rtpg.string.loadField = function() {
  rtpg.string.field = rtpg.getField(rtpg.string.FIELD_NAME);
};

rtpg.string.initializeModel = function(model) {
  var field = model.createString(rtpg.string.START_VALUE);
  model.getRoot().set(rtpg.string.FIELD_NAME, field);
};

rtpg.string.updateUi = function() {
  var elem = document.getElementById(rtpg.string.INPUT_SELECTOR);
  elem.value = rtpg.string.field.getText();
};

rtpg.string.onRealtimeInsert = function(evt) {
  rtpg.log.logEvent(evt, "String Inserted");
};

rtpg.string.onRealtimeDelete = function(evt) {
  rtpg.log.logEvent(evt, "String Deleted");
};

rtpg.string.connectUi = function() {
  var elem = document.getElementById(rtpg.string.INPUT_SELECTOR);
  realtime.store.databinding.bindString(rtpg.string.field, elem);

  setTimeout(function() {
    $('#undoButton').click(function(){rtpg.string.updateUi();});
    $('#redoButton').click(function(){rtpg.string.updateUi();});
  }, 0);
};

rtpg.string.connectRealtime = function() {
  rtpg.string.field.onTextInserted(rtpg.string.onRealtimeInsert);
  rtpg.string.field.onTextDeleted(rtpg.string.onRealtimeDelete);
};
