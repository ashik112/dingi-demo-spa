/* eslint-disable react/jsx-filename-extension */
import React from 'react';

/**
 * /**
 * * [Shows Alert]
 * @param type
 * @param body
 * @param duration
 * @returns {null}
 */
export function showAlert(type, body, duration = 5) {
  try {
    switch (type) {
      case 'success':
        // return message.success(body, duration);
      case 'warning':
        // return message.warning(body, duration);
      case 'error':
        // return message.error(body, duration);
      default:
        return null;
    }
  } catch (error) {
    return null;
  }
}

/**
 * * [Shows Notification using "antd" notification object]
 * ! Requires "antd"
 */
export function showNotification(type, title, body, duration, placement = 'topRight') {
  try {
    switch (type) {
      case 'success':
        return null;
      case 'warning':
        return null;
      case 'error':
        return null;
      default:
        return null;
    }
  } catch (error) {
    return null;
  }
}
