// reaching into React's internals here, so isolating that out.
// no idea if this works on react-native.
export default {
  nodeId: (component) => {
    return component._reactInternalInstance._rootNodeID;
  },

  childComponents: (component) => {
    // Not sure what this wrapping is about, seems like there are different
    // shapes for normal components and bottom ones.
    const renderedComponent = component._reactInternalInstance._renderedComponent._renderedComponent || component._reactInternalInstance._renderedComponent;    
    const renderedChildren = renderedComponent._renderedChildren || {};
    if (!renderedChildren) {
      console.warn(component);
    }

    // same here, some internal DOM components (eg, ReactDOMTextComponent) don't
    // have this property, i assume since we're at the bottom layer bridging to
    // the native system.
    return _.compact(_.pluck(_.values(renderedChildren), '_instance'));
  },

  // This is part of the loggit API, not React internals.
  // It's here since it's something the precompute
  // renderer expects from React components.
  computations: (component) => {
    return (component.computations) ? component.computations() : {};
  }
};