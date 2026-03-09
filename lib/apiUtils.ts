import { NextResponse } from "next/server";

export function respond(
  httpStatusCode: number,
  message: string,
  data: any,
  success: boolean
) {
  return NextResponse.json(
    {
      message,
      data,
      success,
    },
    {
      status: httpStatusCode,
    }
  );
}

