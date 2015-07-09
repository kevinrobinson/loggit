import React from 'react';
import LoggitShell from './loggit/shell';
import ProfilingReporter from './loggit/profiling_reporter'
import initialFacts from './test/initial_facts_set1';
import TodoApp from './components/TodoApp';


// Entry point
const el = document.getElementById('root');
const loggitShell = new LoggitShell(TodoApp, el, {initialFacts});
loggitShell.start();


// For debugging and profiling
window.React = React;
window.loggitShell = loggitShell;
window.profilingReporter = new ProfilingReporter(loggitShell);