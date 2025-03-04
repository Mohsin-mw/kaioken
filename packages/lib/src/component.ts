import { componentSymbol } from "./constants.js"
import { node, type GlobalContext, nodeToCtxMap } from "./globalContext.js"

export { Component }

abstract class Component<T = Record<string, unknown>> {
  rootDom?: HTMLElement
  static [componentSymbol] = true
  state = {} as Record<string, unknown>
  props: T
  vNode: Kaioken.VNode
  ctx: GlobalContext
  constructor(props: T) {
    this.props = props
    this.vNode = node.current!
    this.ctx = nodeToCtxMap.get(this.vNode)!
  }
  abstract render(): JSX.Element

  setState(setter: (state: this["state"]) => this["state"]) {
    this.state = setter({ ...this.state })
    if (this.shouldComponentUpdate(this.props, this.state)) {
      queueMicrotask(() => this.ctx.requestUpdate(this.vNode))
    }
  }

  static isCtor(type: unknown): type is typeof Component {
    return !!type && typeof type === "function" && componentSymbol in type
  }

  componentDidMount?(): void
  componentDidUpdate?(): void
  componentWillUnmount?(): void
  shouldComponentUpdate(nextProps: T, nextState: this["state"]): boolean
  shouldComponentUpdate(): boolean {
    return true
  }
}
