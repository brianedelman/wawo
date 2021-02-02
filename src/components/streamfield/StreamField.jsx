import dynamic from 'next/dynamic';

import streamProp from 'components/streamfield/props';
import Default from 'components/streamfield/Default';
import Loading from 'components/Loading';

const StreamField = ({ stream }) => {
  let StreamComponent;

  const sections = stream.map(section => {
    if (section.component) {
      StreamComponent = dynamic(
        () => import(`components/streamfield/${section.component}`),
        { loading: () => <Loading /> }
      );
    } else {
      StreamComponent = Default;
    }
    return <StreamComponent stream={section.value} key={section.id} />;
  });
  return <>{sections}</>;
};

StreamField.propTypes = {
  stream: streamProp.isRequired,
};

export default StreamField;
