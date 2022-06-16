import { Modal } from "@mantine/core";
import "./Modal.css";

export default ({
  children,
  onclose,
  isOpen,
  showClosetBtn = true,
  size = "lg",
  classnames = "",
}: {
  children: any;
  onclose?: any;
  isOpen: any;
  showClosetBtn?: boolean;
  size?: any;
  classnames?: any;
}) => {
  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onclose}
      withCloseButton={showClosetBtn}
      closeOnClickOutside={showClosetBtn}
      closeOnEscape={showClosetBtn}
      size={size}
      overflow="inside"
      overlayColor="#fafafa"
      overlayOpacity={1}
      // transitionDuration={300}
      trapFocus={true}
      closeButtonLabel="Close modal"
      // shadow="0 2px 3px lightgrey"
    >
      <div className={`eb-modal-content_container ${classnames}`}>
        {children}
      </div>
    </Modal>
  );
};
