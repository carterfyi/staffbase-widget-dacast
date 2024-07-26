/*!
 * Copyright 2024, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BlockAttributes } from '@staffbase/widget-sdk';
import React, { useEffect, ReactElement, useState } from 'react';

export interface DacastEmbedProps extends BlockAttributes {
  contentid: string; // https://player.dacast.com/js/player.js?contentId={contentid}
}


export const DacastEmbed = ({ contentid }: DacastEmbedProps): ReactElement => {

  const [playerHidden, setPlayerHidden] = useState(true);


  const handleScriptLoad = () => {
    // Access the global function here
    if (window.dacast) {
      // Call the global function or perform any actions needed
      try {
        window.dacast(contentid, "dacast-player"); // https://www.dacast.com/player-api-documentation/#aGettingstarted-UsingtheAPI
        setPlayerHidden(false);
      }
      catch (e) {
        console.error('DacastEmbed: Error Loading Dacast Player', e);
      }
    }
  };

  useEffect(() => {

    if (!contentid) {
      console.info('DacastEmbed: No content ID provided');
      return;
    }
    try {
      console.info(`DacastEmbed: Loading Dacast Player with Content ID: ${contentid}`);
      const script = document.createElement('script');
      script.src = `https://player.dacast.com/js/player.js?contentId=${contentid}`;
      script.async = true;
      script.addEventListener('load', handleScriptLoad);
      document.head.appendChild(script);

      // Clean Up on Unmount
      return () => {
        script.removeEventListener('load', handleScriptLoad);
        document.head.removeChild(script);
      };
    } catch (e) {
      console.error('DacastEmbed: Error loading Dacast Player Script', e);

    }
  }, [contentid]);

  return <div style={{
    minWidth: "400px",
    minHeight: "300px",
    overflow: "hidden",
    height: "100%",
  }}>

    <div id="dacast-player" hidden={playerHidden} style={{ position: 'relative' }}></div>
  </div>
    ;
};

declare global {
  interface Window {
    dacast?: (content_id: string, container: HTMLElement | string, options?: any) => void;
  }
}