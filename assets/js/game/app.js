import config from './config.js';

$.each(config.modules, function(key, module) {
    window.dataURL = config.model;
    $('body').append( `<script src="${module}"></script>`); 
});
