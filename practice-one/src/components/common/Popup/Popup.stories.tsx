import Popup from './Popup';

export default {
  title: 'Popup',
  component: Popup,
};

export const Default = () => (
  <Popup isOpen={true} onClose={() => {}}>
    <div>
      <h2>Popup Content</h2>
      <p>This is a sample content for the Popup component.</p>
    </div>
  </Popup>
);

export const Closed = () => (
  <Popup isOpen={false} onClose={() => {}}>
    <div>
      <h2>Popup Content</h2>
      <p>This Popup is closed.</p>
    </div>
  </Popup>
);
