import { CardHeader, CardTitle } from "../ui/card";

export const AuthCardHeader = ({ headerText }: { headerText: string }) => {
  return (
    <CardHeader className="flex items-center justify-center">
      <CardTitle className="text-3xl font-bold bg-gradient-to-t from-pink-400 via-fuchsia-300 to-purple-400 text-transparent bg-clip-text">
        TKIFY
      </CardTitle>
      <h2 className="mt-6 text-md font-extrabold">{headerText}</h2>
    </CardHeader>
  );
};
