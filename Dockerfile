FROM image-registry.openshift-image-registry.svc:5000/react/react-open-shift-example-git:latest
EXPOSE 3000
RUN echo 'we are running some # of cool things'