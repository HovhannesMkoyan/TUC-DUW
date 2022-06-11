import React from "react";
import { useQuery } from "react-query";
import {
  Viewer,
  ThemeContext,
  Worker,
  LocalizationMap,
  LocalizationContext,
  SpecialZoomLevel,
} from "@react-pdf-viewer/core";
import {
  ToolbarSlot,
  toolbarPlugin,
  TransformToolbarSlot,
} from "@react-pdf-viewer/toolbar";
import { themePlugin } from "@react-pdf-viewer/theme";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import DotsLoader from "../HelperComponents/DotsLoader/DotsLoader";
import { readBook } from "../../services/book.service";
import { StateContext } from "../../Context";
import { readBookKey } from "../../utils/queryKeys";
import "./PdfViewer.css";

import am_AM from "./am_AM.json";

export default function PdfViewer(props: any) {
  const { state, setState } = React.useContext(StateContext);

  React.useEffect(() => {
    setState({
      ...state,
      ui: {
        ...state.ui,
        hiddenHeader: true,
        hiddenFooter: true,
        showOverPageLoader: false,
      },
    });

    return () => {
      setState({
        ...state,
        ui: {
          ...state.ui,
          hiddenHeader: false,
          hiddenFooter: false,
          showOverPageLoader: false,
        },
      });
    };
  }, []);

  const { isLoading, data: bookBuffer } = useQuery(
    [readBookKey, props.uuid],
    () => readBook(props.uuid)
  );

  // Toolbar
  const toolbarPluginInstance = toolbarPlugin({});
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;
  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    Print: () => <></>,
    PrintMenuItem: () => <></>,
    Open: () => <></>,
    OpenMenuItem: () => <></>,
    EnterFullScreen: () => <></>,
    EnterFullScreenMenuItem: () => <></>,
    ShowProperties: () => <></>,
    ShowPropertiesMenuItem: () => <></>,
    RotateBackwardMenuItem: () => <></>,
    SwitchSelectionMode: () => <></>,
    SwitchSelectionModeMenuItem: () => <></>,
  });

  // Localization
  const [l10n, setL10n] = React.useState(am_AM as any as LocalizationMap);
  const localizationContext = { l10n, setL10n };

  // Theme
  const themePluginInstance = themePlugin();
  const [currentTheme, setCurrentTheme] = React.useState("light");
  const themeContext = {
    currentTheme,
    setCurrentTheme,
  };

  const closeViewer = () => {
    props.closeViewerMode();

    setState({
      ...state,
      ui: {
        ...state.ui,
        hiddenHeader: false,
        hiddenFooter: false,
      },
    });
  };

  return (
    <main className="eb-pdfviewer_container">
      <div className="webviewer">
        {!isLoading && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.js">
            <div
              style={{
                height: "100%",
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <LocalizationContext.Provider value={localizationContext}>
                <ThemeContext.Provider value={themeContext}>
                  <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
                  <div className="webviewer-close_contanier">
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      onClick={() => closeViewer()}
                    />
                  </div>
                  <Viewer
                    fileUrl={URL.createObjectURL(bookBuffer)}
                    plugins={[toolbarPluginInstance, themePluginInstance]}
                    defaultScale={SpecialZoomLevel.PageFit}
                    theme={currentTheme}
                    renderLoader={() => <DotsLoader size={80} />}
                    renderError={() => (
                      <>
                        <div className="webviewer-error_container">
                          Ինչ-որ սխալ է տեղի ունեցել գիրքը բացելիս
                        </div>
                      </>
                    )}
                  />
                </ThemeContext.Provider>
              </LocalizationContext.Provider>
            </div>
          </Worker>
        )}
      </div>
    </main>
  );
}
