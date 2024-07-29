import React, { FC } from "react";
import { Box, Header, Text } from "zmp-ui";
import { useRecoilValueLoadable } from "recoil";
import { userState } from "state";
import logo from "static/logo.png";
import appConfig from "../../../app-config.json";
import { getConfig } from "utils/config";

export const Welcome: FC = () => {
  const user = useRecoilValueLoadable(userState);
  const avatar =
    user.contents?.avatar || getConfig((c) => c.template.headerLogo) || logo;
  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px]"
      showBackIcon={false}
      title={
        (
          <Box flex alignItems="center" className="space-x-2">
            <Box flex alignItems="center" className="space-x-3">
              <img
                className="w-8 h-8 rounded-full border-inset"
                src={
                  user.contents?.avatar ||
                  getConfig((c) => c.template.headerLogo) ||
                  logo
                }
                alt={"Avatar"}
              />
              <Box>
                {user.state === "hasValue" ? (
                  <>
                    <Box>
                      <Text size="xxsmall" className="text-slate-500">
                        Xin chào,
                      </Text>
                      <Text size="small" className="text-slate-900 font-bold">
                        {user.contents.name}
                      </Text>
                    </Box>
                  </>
                ) : (
                  <Text>...</Text>
                )}
              </Box>
            </Box>
          </Box>
        ) as unknown as string
      }
    />
  );
};
