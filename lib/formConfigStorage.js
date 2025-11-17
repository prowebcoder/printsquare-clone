// lib/formConfigStorage.js

// In-memory storage for form configuration
let formConfigStorage = {};

export function getFormConfig() {
  return formConfigStorage;
}

export function setFormConfig(config) {
  formConfigStorage = config;
  return formConfigStorage;
}

export function resetFormConfig() {
  formConfigStorage = {};
  return formConfigStorage;
}