import React, { cloneElement, ReactElement, ReactNode, useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Component } from 'solid-js'
import { createComponent, render } from 'solid-js/web'

interface SolidProps<P> {
  component: Component<P>
  container?: ReactElement
  childrenContainer?: HTMLElement
  children?: ReactNode
}

export const Solid = <Props extends {}>({
  component,
  container: baseContainer,
  childrenContainer: baseChildrenContainer,
  children,
  ...props
}: Props & SolidProps<Props>) => {
  const containerRef = useRef<any>(null)
  const childrenContainer = useMemo(() => {
    if (!baseChildrenContainer) {
      return document.createElement('div')
    }
    return baseChildrenContainer
  }, [baseChildrenContainer])
  const container = useMemo(() => {
    if (!baseContainer) {
      return <div ref={containerRef} />
    }

    return cloneElement(baseContainer, {
      ...baseContainer.props,
      ref: (node: Element) => {
        containerRef.current = node
        const { ref } = baseContainer as any
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
    })
  }, [baseContainer])

  useEffect(() => {
    const componentProps: any = {
      ...props,
      children: childrenContainer,
    }
    return render(() => createComponent(component, componentProps), containerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component])

  return (
    <>
      {container}
      {children && createPortal(<>{children}</>, childrenContainer)}
    </>
  )
}
