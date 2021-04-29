import { useMemo, useState, useEffect } from 'react'
import { Contract } from '@ethersproject/contracts'
import { BigNumber } from '@ethersproject/bignumber'
import { Provider } from '@ethersproject/providers'
import { Interface, FunctionFragment } from '@ethersproject/abi'

export interface Result extends ReadonlyArray<any> {
  readonly [key: string]: any
}

export interface Call {
  to: string
  data: string
}

type MethodArg = string | number | BigNumber
type MethodArgs = Array<MethodArg | MethodArg[]>

export type OptionalMethodInputs =
  | Array<MethodArg | MethodArg[] | undefined>
  | undefined

function isMethodArg(x: unknown): x is MethodArg {
  return ['string', 'number'].indexOf(typeof x) !== -1
}

function isValidMethodArgs(x: unknown): x is MethodArgs | undefined {
  return (
    x === undefined ||
    (Array.isArray(x) &&
      x.every(
        (xi) => isMethodArg(xi) || (Array.isArray(xi) && xi.every(isMethodArg)),
      ))
  )
}

function callData(
  provider: Provider | null | undefined,
  call: Call,
): Promise<string> | undefined {
  return provider?.call(call)
}

function toCallState(
  callResult: CallResult | undefined | any,
  contractInterface: Interface | undefined,
  fragment: FunctionFragment | undefined,
): Result | undefined {
  return (
    (fragment &&
      callResult &&
      contractInterface?.decodeFunctionResult(fragment, callResult)) ||
    undefined
  )
}

interface CallResult {
  readonly valid: boolean
  readonly result: string | undefined
}

export function useProviderCallResult(
  contract: Contract | null | undefined,
  methodName: string,
  inputs?: OptionalMethodInputs,
): CallResult {
  const [result, setResult] = useState('')
  const fragment = useMemo(() => contract?.interface?.getFunction(methodName), [
    contract,
    methodName,
  ])

  const calls = useMemo<Call[]>(() => {
    return contract && fragment && isValidMethodArgs(inputs)
      ? [
          {
            to: contract.address,
            data: contract.interface.encodeFunctionData(fragment, inputs),
          },
        ]
      : []
  }, [contract, fragment, inputs])

  useEffect(() => {
    callData(contract?.provider, calls[0])?.then((res) => {
      setResult(res)
    })
  }, [result, contract, fragment])

  return useMemo(() => {
    const res: any = toCallState(result, contract?.interface, fragment)
    return {
      result: res,
      valid: !!res,
    }
  }, [result, contract, fragment])
}
